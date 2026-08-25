import {privateInstance} from "./axios.instances.ts";
import type {ManagersResponseDto} from "../types/user.ts";

export const getManagers = async (page: number): Promise<ManagersResponseDto> => {
    const { data } = await privateInstance.get(`/users/managers?page=${page}`);
    return data;
};