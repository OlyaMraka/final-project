import {privateInstance} from "./axios.instances.ts";
import type {ApplicationComment} from "../types/application-comment.ts";

export const getCommentsByApplicationId = async (applicationId: string) => {
    const { data } = await privateInstance.get<ApplicationComment[]>(`/application-comments/application/${applicationId}`);
    return data;
};

export const createComment = async (applicationId: string, text: string) => {
    const { data } = await privateInstance.post<ApplicationComment>("/application-comments", {
        text: text,
        applicationId: applicationId,
    });

    return data;
};

export const deleteComment = async (commentId: string) => {
    await privateInstance.delete(`/application-comments/${commentId}`);
}

export const updateComment = async (commentId: string, text: string) => {
    const { data } = await privateInstance.put(`/application-comments/${commentId}`, { text: text });
    return data;
}