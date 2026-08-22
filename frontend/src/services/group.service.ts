import {privateInstance} from "./axios.instances.ts";
import type {Group} from "../types/group.ts";

export const getAllGroups = async (): Promise<Group[]> => {
    const { data } = await privateInstance.get<Group[]>("/groups");
    return data;
};
