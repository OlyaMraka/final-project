import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {CreateUserDto, UpdateUserDto} from "../dtos/user.dto";

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
