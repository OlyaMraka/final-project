import {IUser} from "../interfaces/user.interface";
import {ApplicationStatistics} from "./application-statistics.dto";

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
    link: string;
}

export type ManagerDto = {
    manager: UserResponseDto;
    statistics: ApplicationStatistics;
}

export type ManagersResponseDto = {
    managers: ManagerDto[];
    total: number;
    limit: number;
    page: number;
    pageCount: number;
}

export type GetManagersRequest = {
    page: number;
}

export type ApplicationOwnerDto = Pick<IUser, "_id" | "name" | "surname" | "role">;