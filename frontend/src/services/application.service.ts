import type {ApplicationFilters, ApplicationResponse} from "../types/application.ts";
import {privateInstance} from "./axios.instances.ts";
import type {EditableApplicationInformation} from "../types/component-props/edit-application-form.ts";
import type {ApplicationStatistics} from "../types/application-statistics.ts";
import {API_ENDPOINTS} from "../constants/api-endpoints.ts";

export const getAllWithFilters = async (filters: ApplicationFilters): Promise<ApplicationResponse> => {
    const { data } = await privateInstance.get(API_ENDPOINTS.APPLICATIONS.BASE,
        {
            params: filters
        });

    return data;
};

export const setManager = async (applicationId: string) => {
    await privateInstance.post(API_ENDPOINTS.APPLICATIONS.SET_MANAGER(applicationId));
};

export const editApplication = async (applicationId: string, application: EditableApplicationInformation) => {
    const { data } = await privateInstance.put(API_ENDPOINTS.APPLICATIONS.BY_ID(applicationId), application);
    return data;
};

export const exportApplications = async (filters: ApplicationFilters): Promise<Blob> => {
    const { data } = await privateInstance.get(API_ENDPOINTS.APPLICATIONS.EXPORT,
        {
            params: filters,
            responseType: "blob",
        }
    );

    return data;
};

export const getApplicationStatistics = async (): Promise<ApplicationStatistics> => {
    const { data } = await privateInstance.get(API_ENDPOINTS.APPLICATIONS.STATISTICS);
    return data;
};
