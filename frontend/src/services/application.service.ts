import type {ApplicationFilters, ApplicationResponse} from "../types/application.ts";
import {privateInstance} from "./axios.instances.ts";
import type {EditableApplicationInformation} from "../types/component-props/edit-application-form.ts";

export const getAllWithFilters = async (filters: ApplicationFilters): Promise<ApplicationResponse> => {
    const { data } = await privateInstance.get("applications",
        {
            params: filters
        });

    return data;
}

export const setManager = async (applicationId: string) => {
    await privateInstance.post(`/applications/set-manager/${applicationId}`);
}

export const editApplication = async (applicationId: string, application: EditableApplicationInformation) => {
    const { data } = await privateInstance.put(`/applications/${applicationId}`, application);
    return data;
}

export const exportApplications = async (filters: ApplicationFilters): Promise<Blob> => {
    const { data } = await privateInstance.get("/applications/export",
        {
            params: filters,
            responseType: "blob",
        }
    );

    return data;
};
