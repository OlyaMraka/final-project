import * as axios from "axios";
import {getItemFromLocalStorage} from "./helpers.ts";
import type {Token} from "../types/user.ts";
import {refresh} from "./auth.service.ts";

export const privateInstance = axios.create({
    baseURL: "http://localhost:7000",
    headers: {}
});

export const publicInstance = axios.create({
    baseURL: "http://localhost:7000",
});

privateInstance.interceptors.request.use(request => {
    request.headers.Authorization = "Bearer " + getItemFromLocalStorage<Token>("token").access_token;
    return request;
});

privateInstance.interceptors.response.use(
    response => response,

    async error => {
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            await refresh();

            return privateInstance(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
);