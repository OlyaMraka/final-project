import type {GroupSliceType} from "../types/group.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getAllGroups} from "../../services/group.service.ts";
import type {Group} from "../../types/group.ts";
import * as axios from "axios";

const initialState: GroupSliceType = { groups: [] };

const getAllGroupsAction = createAsyncThunk("groupSlice/getAllGroupsAction", async (_, thunkAPI) => {
    try {
        const data = await getAllGroups();
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

export const groupSlice = createSlice({
    name: "groupSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(getAllGroupsAction.fulfilled, (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
        })
})

export const groupSliceActions = {
    ...groupSlice.actions, getAllGroupsAction
};
