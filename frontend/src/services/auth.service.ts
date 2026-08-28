import {privateInstance, publicInstance} from "./axios.instances.ts";
import type {LogInResponse, Token, User} from "../types/user.ts";
import {getItemFromLocalStorage} from "./helpers.ts";
import {API_ENDPOINTS} from "../constants/api-endpoints.ts";

export const login = async (email: string, password: string): Promise<LogInResponse> => {
    const { data } = await publicInstance.post<LogInResponse>("/auth/sign-in", {email, password});
    return data
};

export const logout = async (): Promise<void> => {
    const token = getItemFromLocalStorage<Token>("token");

    await publicInstance.post<Token>(
        API_ENDPOINTS.AUTH.LOG_OUT,
        {
            refresh_token: token.refresh_token,
        }
    );

    localStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<User> => {
    const { data } = await privateInstance.get<User>(API_ENDPOINTS.AUTH.ME);

    return data;
};

export const refresh = async (): Promise<Token> => {
    const token = getItemFromLocalStorage<Token>("token");

    const { data } = await publicInstance.post<Token>(
        API_ENDPOINTS.AUTH.REFRESH,
        {
            refresh_token: token.refresh_token,
        }
    );

    localStorage.setItem("token", JSON.stringify(data));
    return data;
};

export const setPassword = async (activationToken: string, password: string): Promise<void> => {
    await publicInstance.patch(API_ENDPOINTS.AUTH.SET_PASSWORD, {
        activationToken: activationToken,
        password: password,
    });
};
