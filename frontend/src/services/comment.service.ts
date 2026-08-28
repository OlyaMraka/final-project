import {privateInstance} from "./axios.instances.ts";
import type {ApplicationComment} from "../types/application-comment.ts";
import {API_ENDPOINTS} from "../constants/api-endpoints.ts";

export const getCommentsByApplicationId = async (applicationId: string) => {
    const { data } = await privateInstance.get<ApplicationComment[]>(API_ENDPOINTS.APPLICATION_COMMENTS.BY_APPLICATION_ID(applicationId));
    return data;
};

export const createComment = async (applicationId: string, text: string) => {
    const { data } = await privateInstance.post<ApplicationComment>(API_ENDPOINTS.APPLICATION_COMMENTS.BASE, {
        text: text,
        applicationId: applicationId,
    });

    return data;
};

export const deleteComment = async (commentId: string) => {
    await privateInstance.delete(API_ENDPOINTS.APPLICATION_COMMENTS.BY_ID(commentId));
};

export const updateComment = async (commentId: string, text: string) => {
    const { data } = await privateInstance.put(API_ENDPOINTS.APPLICATION_COMMENTS.BY_ID(commentId), { text: text });
    return data;
};
