import {userRepository} from "../repositories/user.repository";
import {IUser} from "../interfaces/user.interface";
import {ActivateUserResponseDto, CreateUserDto, UpdateUserDto} from "../dtos/user.dto";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {ServiceConstants} from "../constants/error.constants";
import {tokenService} from "./token.service";

class UserService {
    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll();
    }

    public async create(user: CreateUserDto): Promise<IUser> {
        await this.isEmailUnique(user.email);

        return await userRepository.create(user);
    }

    public async getById(userId: string): Promise<IUser> {
        return await userRepository.getById(userId);
    }

    public async deleteById(userId: string): Promise<IUser> {
        return await userRepository.deleteById(userId);
    }

    public async updateById(userId: string, user: UpdateUserDto): Promise<IUser> {
        return await userRepository.updateById(userId, user);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.USER_ALREADY_EXISTS);
        }
    }

    public async banUserById(userId: string): Promise<IUser> {
        return await userRepository.banUserById(userId);
    }

    public async unbanUserById(userId: string): Promise<IUser> {
        return await userRepository.unbanUserById(userId);
    }

    public async activateUserById(userId: string): Promise<ActivateUserResponseDto> {
        const user = await userRepository.activateUserById(userId);

        const activationToken = tokenService.generateActivationToken(user._id);
        return { activationToken };
    }
}

export const userService = new UserService();
