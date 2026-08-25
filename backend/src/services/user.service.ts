import {userRepository} from "../repositories/user.repository";
import {IUser} from "../interfaces/user.interface";
import {
    CreateUserDto,
    ManagersResponseDto,
    UpdateUserDto,
    UserResponseDto
} from "../dtos/user.dto";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {ServiceConstants} from "../constants/error.constants";
import {tokenService} from "./token.service";
import {applicationRepository} from "../repositories/application.repository";
import {TemplateNames} from "../constants/email.Templates.constants";
import {emailService} from "./email.service";
import {EmailTopicsConstants} from "../constants/emailTopic.constants";

class UserService {
    public async getAll(): Promise<UserResponseDto[]> {
        const users = await userRepository.getAll();

        return users.map((user) => this.mapUserToResponse(user));
    }

    public async getManagers(page: number): Promise<ManagersResponseDto> {
        const {managers, total, limit, page: currentPage, pageCount,} = await userRepository.getManagers(page);

        const managersWithStatistics = await Promise.all(
            managers.map(async manager => ({
                manager: this.mapUserToResponse(manager),
                statistics: await applicationRepository.getManagerStatistics(
                    manager._id.toString(),
                ),
            })),
        );

        return {
            managers: managersWithStatistics,
            total,
            limit,
            page: currentPage,
            pageCount,
        };
    }

    public async create(user: CreateUserDto): Promise<IUser> {
        await this.isEmailUnique(user.email);

        return await userRepository.create(user);
    }

    public async getById(userId: string): Promise<UserResponseDto> {
        const user = await userRepository.getById(userId);

        return this.mapUserToResponse(user);
    }

    public async deleteById(userId: string): Promise<IUser> {
        return await userRepository.deleteById(userId);
    }

    public async updateById(userId: string, user: UpdateUserDto): Promise<UserResponseDto> {
        const userResponse = await userRepository.updateById(userId, user);
        return this.mapUserToResponse(userResponse);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.USER_ALREADY_EXISTS);
        }
    }

    public async banUserById(userId: string): Promise<UserResponseDto> {
        const user = await userRepository.banUserById(userId);
        return this.mapUserToResponse(user);
    }

    public async unbanUserById(userId: string): Promise<UserResponseDto> {
        const user = await userRepository.unbanUserById(userId);
        return this.mapUserToResponse(user);
    }

    public async activateUserById(userId: string): Promise<UserResponseDto> {
        const user = await userRepository.activateUserById(userId);

        const activationToken = tokenService.generateActivationToken(user._id);

        await emailService.sendEmail(
            user.email,
            EmailTopicsConstants.SET_PASSWORD,
            TemplateNames.SET_PASSWORD,
            {
                activationLink: `http://localhost:5173/set-password?token=${activationToken}`,
            }
        );

        return this.mapUserToResponse(user);
    }

    public mapUserToResponse(user: IUser): UserResponseDto {
        return {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            banned: user.banned,
            deleted: (user as IUser & { deleted: boolean }).deleted,
            isActive: user.isActive,
            lastLogin: user.lastLogin,
        };
    }
}

export const userService = new UserService();
