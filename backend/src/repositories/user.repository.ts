import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {CreateUserDto, UpdateUserDto} from "../dtos/user.dto";
import {RoleName} from "../enums/role-name.enum";

const MANAGERS_PAGE_SIZE = 15;

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public create(user: CreateUserDto): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public async getManagers(page: number): Promise<{
        managers: IUser[];
        total: number;
        page: number;
        limit: number;
        pageCount: number;
    }> {
        const skip = (page - 1) * MANAGERS_PAGE_SIZE;

        const filter = {
            role: RoleName.MANAGER,
        };

        const [managers, total] = await Promise.all([
            User.find(filter)
                .sort({createdAt: -1})
                .skip(skip)
                .limit(MANAGERS_PAGE_SIZE)
                .lean(),

            User.countDocuments(filter),
        ]);

        return {
            managers,
            total,
            page,
            limit: MANAGERS_PAGE_SIZE,
            pageCount: Math.ceil(total / MANAGERS_PAGE_SIZE),
        };
    }

    public deleteById(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }

    public updateById(userId: string, user: UpdateUserDto): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user, { returnDocument: 'after' });
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    public banUserById(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { banned: true }, { returnDocument: 'after' });
    }

    public unbanUserById(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { banned: false }, { returnDocument: 'after' });
    }

    public activateUserById(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { isActive: true }, { returnDocument: 'after' });
    }

    public setUserPassword(userId: string, password: string): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { password }, { returnDocument: 'after' });
    }
}

export const userRepository = new UserRepository();
