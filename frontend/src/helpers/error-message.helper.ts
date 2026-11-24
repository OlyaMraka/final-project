import * as axios from "axios";

export const getErrorMessage = (
    error: unknown,
    fallbackMessage: string
): string => {
    if (typeof error === "string") {
        return error;
    }

    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || fallbackMessage;
    }

    return fallbackMessage;
};
