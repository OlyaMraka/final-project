import type {ApplicationStatisticsSliceType} from "../types/application-statistics.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getApplicationStatistics} from "../../services/application.service.ts";
import type {ApplicationStatistics} from "../../types/application-statistics.ts";
import {getErrorMessage} from "../../helpers/error-message.helper.ts";
import {GeneralApiErrors} from "../../constants/api-errors.ts";

const initialState: ApplicationStatisticsSliceType = {};

const getApplicationStatisticsAction = createAsyncThunk("applicationStatisticsSlice/getApplicationStatisticsAction",
    async (_, thunkAPI) => {
        try {
            const data = await getApplicationStatistics();
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getErrorMessage(
                    error,
                    GeneralApiErrors.APPLICATION_STATISTICS.FAILED_TO_GET_STATISTICS
                )
            );
        }
    }
);

export const applicationStatisticsSlice = createSlice({
    name: "applicationStatisticsSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(getApplicationStatisticsAction.fulfilled, (state, action: PayloadAction<ApplicationStatistics>) => {
            state.statistics = action.payload;
        })
});

export const applicationStatisticsActions = {
    ...applicationStatisticsSlice.actions, getApplicationStatisticsAction
};
