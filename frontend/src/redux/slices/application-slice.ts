import type {ApplicationSliceType, EditApplicationParams} from "../types/application.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ApplicationFilters, ApplicationResponse, IApplicationResponse} from "../../types/application.ts";
import {editApplication, getAllWithFilters} from "../../services/application.service.ts";

const initialState: ApplicationSliceType = {};

const getAllApplicationsWithFilters = createAsyncThunk("applicationSlice/getAllApplicationsWithFilters",
    async (filters: ApplicationFilters, thunkAPI) => {
        try {
            const data = await getAllWithFilters(filters);
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                "Something went wrong"
            );
        }
    }
);

const updateApplication = createAsyncThunk("applicationSlice/updateApplication",
    async (applicationInfo: EditApplicationParams, thunkAPI) => {
        try {
            const data = await editApplication(applicationInfo.applicationId, applicationInfo.application);
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                "Something went wrong"
            );
        }
    });

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
            .addCase(
                updateApplication.fulfilled,
                (state, action: PayloadAction<IApplicationResponse>) => {
                    const index = state.applications?.findIndex(
                        application => application._id === action.payload._id
                    );

                    if (index !== undefined && index !== -1 && state.applications) {
                        state.applications[index] = action.payload;
                    }
                }
            )
});

export const applicationSliceActions = {
    ...applicationSlice.actions, getAllApplicationsWithFilters, updateApplication
};
