import type {ManagerSliceType} from "../types/manager.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getManagers} from "../../services/user.service.ts";
import type {ManagersResponseDto} from "../../types/user.ts";

const initialState: ManagerSliceType = {};

const getAllManagersAction = createAsyncThunk("managerSlice/getAllManagersAction", async (page: number, thunkAPI) =>{
    try {
        const data = await getManagers(page);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            "Something went wrong"
        );
    }
});

export const managerSlice = createSlice({
    name: "managerSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(getAllManagersAction.fulfilled, (state, action: PayloadAction<ManagersResponseDto>) => {
            state.managers = action.payload.managers;
            state.total = action.payload.total;
            state.limit = action.payload.limit;
            state.pageCount = action.payload.pageCount;
            state.page = action.payload.page;
        })
});

export const managerSliceActions = {
    ...managerSlice.actions, getAllManagersAction
};
