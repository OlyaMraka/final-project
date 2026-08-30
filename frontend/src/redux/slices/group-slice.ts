import type {GroupSliceType} from "../types/group.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {createGroup, getAllGroups} from "../../services/group.service.ts";
import type {Group} from "../../types/group.ts";
import * as axios from "axios";

const initialState: GroupSliceType = { groups: [] };

const getAllGroupsAction = createAsyncThunk("groupSlice/getAllGroupsAction", async (_, thunkAPI) => {
    try {
        const data = await getAllGroups();
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            "Something went wrong"
        );
    }
});

const createGroupAction = createAsyncThunk("groupSlice/createGroupAction", async (name: string, thunkAPI)=> {
    try {
        const data = await createGroup(name);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ?? "Something went wrong"
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
            .addCase(createGroupAction.fulfilled, (state, action: PayloadAction<Group>) => {
                state.groups.push(action.payload);
            })

});

export const groupSliceActions = {
    ...groupSlice.actions, getAllGroupsAction, createGroupAction
};
