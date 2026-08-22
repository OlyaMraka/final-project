import type {ApplicationSliceType} from "../types/application.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ApplicationFilters, ApplicationResponse} from "../../types/application.ts";
import {getAllWithFilters} from "../../services/application.service.ts";
import * as axios from "axios";

const initialState: ApplicationSliceType = {};

const getAllApplicationsWithFilters = createAsyncThunk("applicationSlice/getAllApplicationsWithFilters",
    async (filters: ApplicationFilters, thunkAPI) => {
        try {
            const data = await getAllWithFilters(filters);
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
    }
);

export const applicationSlice = createSlice({
    name: "applicationSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(getAllApplicationsWithFilters.fulfilled, (state, action: PayloadAction<ApplicationResponse>) => {
            state.applications = action.payload.applications;
            state.total = action.payload.total;
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            state.pagesCount = action.payload.pagesCount
        })
});

export const applicationSliceActions = {
    ...applicationSlice.actions, getAllApplicationsWithFilters
};
