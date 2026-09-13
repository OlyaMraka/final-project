import type {ManagerSliceType} from "../types/manager.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {activateUser, banUser, createManager, getManagers, unbanUser} from "../../services/user.service.ts";
import type {CreateManagerDto, ManagersResponseDto, User} from "../../types/user.ts";
import {getErrorMessage} from "../../helpers/error-message.helper.ts";
import {GeneralApiErrors} from "../../constants/api-errors.ts";

const initialState: ManagerSliceType = {};

const updateManager = (
    state: ManagerSliceType,
    updatedUser: User
) => {
    const manager = state.managers?.find(
        item => item.manager._id === updatedUser._id
    );

    if (manager) {
        manager.manager = updatedUser;
    }
};

const getAllManagersAction = createAsyncThunk("managerSlice/getAllManagersAction", async (page: number, thunkAPI) =>{
    try {
        const data = await getManagers(page);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            getErrorMessage(
                error,
                GeneralApiErrors.MANAGERS.FAILED_TO_GET_MANAGERS
            )
        );
    }
});

const banManagerAction = createAsyncThunk("managerSlice/banManagerAction", async (managerId: string, thunkAPI) => {
    try {
        const data = await banUser(managerId);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            getErrorMessage(
                error,
                GeneralApiErrors.MANAGERS.FAILED_TO_BAN_MANAGER
            )
        );
    }
});

const unbanManagerAction = createAsyncThunk("managerSlice/unbanManagerAction", async (managerId: string, thunkAPI) => {
    try {
        const data = await unbanUser(managerId);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            getErrorMessage(
                error,
                GeneralApiErrors.MANAGERS.FAILED_TO_UNBAN_MANAGER
            )
        );
    }
});

const activateManagerAction = createAsyncThunk("managerSlice/activateManagerAction", async (managerId: string, thunkAPI) => {
    try {
        const data = await activateUser(managerId);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            getErrorMessage(
                error,
                GeneralApiErrors.MANAGERS.FAILED_TO_ACTIVATE_MANAGER
            )
        );
    }
});

const createManagerAction = createAsyncThunk("managerSlice/createManagerAction", async (managerDto: CreateManagerDto, thunkAPI) => {
    try {
        const data = await createManager(managerDto);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            getErrorMessage(
                error,
                GeneralApiErrors.MANAGERS.FAILED_TO_CREATE_MANAGER
            )
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
            .addCase(
                banManagerAction.fulfilled,
                (state, action: PayloadAction<User>) => {
                    updateManager(state, action.payload);
                }
            )
            .addCase(
                unbanManagerAction.fulfilled,
                (state, action: PayloadAction<User>) => {
                    updateManager(state, action.payload);
                }
            )
            .addCase(
                activateManagerAction.fulfilled,
                (state, action: PayloadAction<User>) => {
                    updateManager(state, action.payload);
                }
            )
});

export const managerSliceActions = {
    ...managerSlice.actions, getAllManagersAction, banManagerAction,
    unbanManagerAction, createManagerAction, activateManagerAction
};
