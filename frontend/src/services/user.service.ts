import {privateInstance} from "./axios.instances.ts";
import type {CreateManagerDto, ManagersResponseDto, User} from "../types/user.ts";

export const getManagers = async (page: number): Promise<ManagersResponseDto> => {
    const { data } = await privateInstance.get(`/users/managers?page=${page}`);
    return data;
};

export const banUser = async (managerId: string): Promise<User> => {
    const { data } = await privateInstance.patch(`/users/${managerId}/ban`);
    return data;
}

export const unbanUser = async (managerId: string): Promise<User> => {
    const { data } = await privateInstance.patch(`/users/${managerId}/unban`);
    return data;
}

export const createManager = async (managerDto: CreateManagerDto): Promise<User> => {
    const { data } = await privateInstance.post("/users", managerDto);
    return data;
}

export const activateUser = async (managerId: string): Promise<User> => {
    const { data } = await privateInstance.patch(`/users/${managerId}/activate`);
    return data;
}
