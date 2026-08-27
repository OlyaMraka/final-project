import * as axios from "axios";
import {getItemFromLocalStorage} from "./helpers.ts";
import type {Token} from "../types/user.ts";
import {refresh} from "./auth.service.ts";
import type {AxiosError, InternalAxiosRequestConfig} from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const privateInstance = axios.create({
    baseURL: api_url,
    headers: {}
});

export const publicInstance = axios.create({
    baseURL: api_url,
});

privateInstance.interceptors.request.use(request => {
        const token = getItemFromLocalStorage<Token>("token");

        if (token?.access_token) {
            request.headers.Authorization = `Bearer ${token.access_token}`;
        }

        return request;
    }
);

interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

privateInstance.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig;

        if (
            error.response?.status !== 401 ||
            !originalRequest
        ) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            await refresh();

            return privateInstance(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem("token");

            window.location.href = "/";

            return Promise.reject(refreshError);
        }
    }
);
