import {
    isRejectedWithValue,
    type Middleware,
} from "@reduxjs/toolkit";
import { notificationSliceActions } from "../slices/notification-slice.ts";

export const notificationMiddleware: Middleware =
    ({ dispatch }) =>
        next =>
            action => {
                if (isRejectedWithValue(action)) {
                    const message =
                        typeof action.payload === "string"
                            ? action.payload
                            : "Something went wrong";

                    dispatch(
                        notificationSliceActions.showNotification({
                            message,
                            severity: "error",
                        })
                    );
                }

                return next(action);
            };
