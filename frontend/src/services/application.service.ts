import type {ApplicationFilters, ApplicationResponse} from "../types/application.ts";
import {privateInstance} from "./axios.instances.ts";

export const getAllWithFilters = async (filters: ApplicationFilters): Promise<ApplicationResponse> => {
    const { data } = await privateInstance.get("applications",
        {
            params: filters
        });

    return data;
}
