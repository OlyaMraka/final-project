import {privateInstance, publicInstance} from "./axios.instances.ts";
import type {LogInResponse, Token, User} from "../types/user.ts";
import {getItemFromLocalStorage} from "./helpers.ts";

export const login = async (email: string, password: string): Promise<LogInResponse> => {
    const { data } = await publicInstance.post<LogInResponse>("/auth/sign-in", {email, password});
    return data
}

export const logout = async (): Promise<void> => {
    const token = getItemFromLocalStorage<Token>("token");

    await publicInstance.post<Token>(
        "/auth/log-out",
        {
            refresh_token: token.refresh_token,
        }
    );

    localStorage.removeItem("token");
}

export const getCurrentUser = async (): Promise<User> => {
    const { data } = await privateInstance.get<User>("/auth/me");

    return data;
}

export const refresh = async (): Promise<Token> => {
    const token = getItemFromLocalStorage<Token>("token");

    const { data } = await publicInstance.post<Token>(
        "/auth/refresh",
        {
            refresh_token: token.refresh_token,
        }
    );

    localStorage.setItem("token", JSON.stringify(data));
    return data;
};

export const setPassword = async (activationToken: string, password: string): Promise<void> => {
    await publicInstance.patch("/auth/set-password", {
        activationToken: activationToken,
        password: password,
    });
};
