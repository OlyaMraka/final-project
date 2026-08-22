import {IUser} from "../interfaces/user.interface";

export type CreateUserDto = Pick<IUser,
    "name" |
    "surname" |
    "email">;

export type UpdateUserDto = Pick<IUser,
    "name" |
    "surname" |
    "email">;

export type UserResponseDto = Pick<IUser,
    "_id" |
    "name" |
    "surname" |
    "email" |
    "role" |
    "banned" |
    "deleted" |
    "isActive" |
    "lastLogin">;

export type ActivateUserResponseDto = {
    activationToken: string;
}

export type ApplicationOwnerDto = Pick<IUser, "_id" | "name" | "surname" | "role">;