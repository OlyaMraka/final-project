import { Alert, Snackbar } from "@mui/material";
import { useAppSelector } from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {notificationSliceActions} from "../../redux/slices/notification-slice.ts";

export const Notification = () => {
    const dispatch = useAppDispatch();

    const { open, message, severity } = useAppSelector(
        ({ notificationSlice }) => notificationSlice
    );

    const handleClose = () => {
        dispatch(notificationSliceActions.hideNotification());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{
                    backgroundColor: "rgb(255 98 0 / 0.54)",
                    color: "#ffffff",

                    "& .MuiAlert-icon": {
                        color: "#ffffff",
                    },

                    "& .MuiIconButton-root": {
                        color: "#ffffff",
                    },
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
