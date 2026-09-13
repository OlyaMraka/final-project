import type {AlertColor} from "@mui/material";

export type NotificationSliceType = {
    open: boolean;
    message: string;
    severity: AlertColor;
}