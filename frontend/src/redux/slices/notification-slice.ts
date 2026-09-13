import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AlertColor } from "@mui/material";
import type {NotificationSliceType} from "../types/notifications.ts";

const initialState: NotificationSliceType = {
    open: false,
    message: "",
    severity: "error",
};

export const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {
        showNotification: (
            state,
            action: PayloadAction<{
                message: string;
                severity: AlertColor;
            }>
        ) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },

        hideNotification: (state) => {
            state.open = false;
        },
    },
});

export const notificationSliceActions = {
    ...notificationSlice.actions,
};