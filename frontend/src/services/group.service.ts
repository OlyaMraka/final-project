import {privateInstance} from "./axios.instances.ts";
import type {Group} from "../types/group.ts";
import {API_ENDPOINTS} from "../constants/api-endpoints.ts";

export const getAllGroups = async (): Promise<Group[]> => {
    const { data } = await privateInstance.get<Group[]>(API_ENDPOINTS.GROUPS.BASE);
    return data;
};

export const createGroup = async (name: string): Promise<Group> => {
    const { data } = await privateInstance.post(API_ENDPOINTS.GROUPS.BASE, { name });
    return data;
};
