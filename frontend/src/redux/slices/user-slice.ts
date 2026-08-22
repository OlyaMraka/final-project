import type {UserSliceType} from "../types/user.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {SignInParams} from "../../types/sign-in-form.ts";
import {getCurrentUser, login} from "../../services/auth.service.ts";
import type {LogInResponse, User} from "../../types/user.ts";
import * as axios from "axios";

const initialState: UserSliceType = {};

const signIn = createAsyncThunk("userSlice/signIn", async (params: SignInParams, thunkAPI) => {
    try {
        const data = await login(params.email, params.password);
        const { token } = data;

        localStorage.setItem('token', JSON.stringify(token));

        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Invalid email or password"
            );
        }

        return thunkAPI.rejectWithValue("Something went wrong");
    }
});

const me = createAsyncThunk("userSlice/me", async (_, thunkAPI) => {
    try {
        const data = await getCurrentUser();
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                return thunkAPI.rejectWithValue(
                    "Unauthorized"
                );
            }

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Request failed"
            );
        }

        return thunkAPI.rejectWithValue(
            "Something went wrong"
        );
    }
});

export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<LogInResponse>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(me.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
            })
});

export const userSliceActions = {
    ...userSlice.actions, signIn, me
};
