import {privateInstance} from "./axios.instances.ts";
import type {CreateManagerDto, ManagersResponseDto, User, UserLinkResponse} from "../types/user.ts";
import {API_ENDPOINTS} from "../constants/api-endpoints.ts";

export const getManagers = async (page: number): Promise<ManagersResponseDto> => {
    const { data } = await privateInstance.get(API_ENDPOINTS.USERS.MANAGERS(page));
    return data;
};

export const createManager = async (managerDto: CreateManagerDto): Promise<User> => {
    const { data } = await privateInstance.post(API_ENDPOINTS.USERS.BASE, managerDto);
    return data;
};

export const activateUser = async (managerId: string): Promise<UserLinkResponse> => {
    const { data } = await privateInstance.patch(API_ENDPOINTS.USERS.ACTIVATE(managerId));
    return data;
};

export const banUser = async (managerId: string): Promise<User> => {
    const { data } = await privateInstance.patch(API_ENDPOINTS.USERS.BAN(managerId));
    return data;
};

export const unbanUser = async (managerId: string): Promise<User> => {
    const { data } = await privateInstance.patch(API_ENDPOINTS.USERS.UNBAN(managerId));
    return data;
};

export const recoverUserPassword = async (managerId: string): Promise<UserLinkResponse> => {
    const { data } = await privateInstance.patch(API_ENDPOINTS.USERS.RECOVER_PASSWORD(managerId));
    return data;
};
