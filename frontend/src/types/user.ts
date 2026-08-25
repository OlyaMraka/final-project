import type {ApplicationStatistics} from "./application-statistics.ts";

export type User = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    banned: boolean;
    deleted: boolean;
    isActive: boolean;
    lastLogin: Date;
}

export type ApplicationOwnerDto = Pick<User, "_id" | "name" | "surname" | "role">;

export type Token = {
    access_token: string;
    refresh_token: string;
}

export type LogInResponse = {
    user: User;
    token: Token;
}

export type ManagerDto = {
    manager: User;
    statistics: ApplicationStatistics;
}

export type ManagersResponseDto = {
    managers: ManagerDto[];
    total: number;
    limit: number;
    page: number;
    pageCount: number;
}
