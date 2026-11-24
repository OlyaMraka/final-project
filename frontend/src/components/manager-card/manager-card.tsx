import {type FC, useState} from "react";
import type {ManagerCardProps} from "../../types/component-props/manager-card.ts";
import "./manager-card.css";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {managerSliceActions} from "../../redux/slices/manager-slice.ts";
import { Alert, Snackbar, type AlertColor } from "@mui/material";
import {recoverUserPassword} from "../../services/user.service.ts";
import type {UserLinkResponse} from "../../types/user.ts";
import {getErrorMessage} from "../../helpers/error-message.helper.ts";

const ManagerCard: FC<ManagerCardProps> = ({managerInfo}) => {
    const dispatch = useAppDispatch();

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<AlertColor>("success");

    const showMessage = (message: string, severity: AlertColor = "success") => {
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
    };

    const getErrorText = (error: unknown) =>
        getErrorMessage(error, "The action failed. Please try again.");

    const copyLinkAndReport = async (response: UserLinkResponse, action: string) => {
        try {
            await navigator.clipboard.writeText(response.link);
        } catch {
            showMessage(`Could not copy the link. Copy it manually: ${response.link}`, "error");
            return;
        }

        showMessage(
            response.emailSent
                ? `${action} link copied to clipboard and sent by email.`
                : `${action} link copied to clipboard. Email could not be sent.`,
            response.emailSent ? "success" : "warning"
        );
    };

    const handleBan = async () => {
        try {
            await dispatch(managerSliceActions.banManagerAction(managerInfo.manager._id)).unwrap();
            showMessage("Manager has been banned.");
        } catch (error) {
            showMessage(getErrorText(error), "error");
        }
    };

    const handleUnban = async () => {
        try {
            await dispatch(managerSliceActions.unbanManagerAction(managerInfo.manager._id)).unwrap();
            showMessage("Manager has been unbanned.");
        } catch (error) {
            showMessage(getErrorText(error), "error");
        }
    };

    const handleActivate = async () => {
        try {
            const response = await dispatch(
                managerSliceActions.activateManagerAction(
                    managerInfo.manager._id
                )
            ).unwrap();
            await copyLinkAndReport(response, "Activation");
        } catch (error) {
            showMessage(getErrorText(error), "error");
        }
    };

    const handleRecoverPassword = async () => {
        try {
            const response = await recoverUserPassword(managerInfo.manager._id);
            await copyLinkAndReport(response, "Password reset");
        } catch (error) {
            showMessage(getErrorText(error), "error");
        }
    };

    return (
        <>
            <div className="manager-card-block">
                <div className="manager-info-first-col">
                    <p>Id: {managerInfo.manager._id}</p>
                    <p>Name: {managerInfo.manager.name}</p>
                    <p>Surname: {managerInfo.manager.surname}</p>
                    <p>Email: {managerInfo.manager.email}</p>
                    <p>Role: {managerInfo.manager.role}</p>
                    <p>Active: {managerInfo.manager.isActive ? "Yes" : "No"}</p>
                    <p>Banned: {managerInfo.manager.banned ? "Yes" : "No"}</p>
                    <p>Last login: {
                        managerInfo.manager.lastLogin ?
                        new Date(managerInfo.manager.lastLogin).toLocaleString("uk-UA") : " - "}</p>
                </div>

                <div className="manager-info-second-col">
                    <p>Total applications: {managerInfo.statistics.total}</p>
                    <div className="applications-status-info-block">
                        {
                            managerInfo.statistics.statusStatistics.map(value => (
                                <p className="application-status-item">{value.status} - {value.applicationCount}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="manager-info-third-col">
                    { !managerInfo.manager.isActive && <button onClick={handleActivate} className="activate-button">Activate</button> }
                    { managerInfo.manager.isActive && <button onClick={handleRecoverPassword} className="recover-password-button">Recover password</button> }
                    <button className="ban-button" onClick={handleBan} disabled={managerInfo.manager.banned}>Ban</button>
                    <button className="unban-button" onClick={handleUnban} disabled={!managerInfo.manager.banned}>Unban</button>
                </div>
            </div>

            <Snackbar
                open={toastOpen}
                autoHideDuration={8000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={toastSeverity}
                    onClose={() => setToastOpen(false)}
                >
                    {toastMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ManagerCard;
