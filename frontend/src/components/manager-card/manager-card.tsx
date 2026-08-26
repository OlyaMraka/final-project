import {type FC, useState} from "react";
import type {ManagerCardProps} from "../../types/component-props/manager-card.ts";
import "./manager-card.css";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {managerSliceActions} from "../../redux/slices/manager-slice.ts";
import { Alert, Snackbar } from "@mui/material";
import {recoverUserPassword} from "../../services/user.service.ts";

const ManagerCard: FC<ManagerCardProps> = ({managerInfo}) => {
    const dispatch = useAppDispatch();

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleBanToggle = async () => {
        try {
            if (managerInfo.manager.banned) {
                await dispatch(
                    managerSliceActions.unbanManagerAction(
                        managerInfo.manager._id
                    )
                ).unwrap();

                setToastMessage("Manager has been unbanned");
                setToastOpen(true);
            } else {
                await dispatch(
                    managerSliceActions.banManagerAction(
                        managerInfo.manager._id
                    )
                ).unwrap();

                setToastMessage("Manager has been banned");
                setToastOpen(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleActivate = async () => {
        try {
            await dispatch(
                managerSliceActions.activateManagerAction(
                    managerInfo.manager._id
                )
            ).unwrap();

            setToastMessage("Manager has been activated. Email for set-password has been sent!");
            setToastOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRecoverPassword = async () => {
        try {
            await recoverUserPassword(managerInfo.manager._id);

            setToastMessage("Password recovery email has been sent!");
            setToastOpen(true);
        } catch (error) {
            console.error(error);
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
                    <button className={managerInfo.manager.banned ? "unban-button" : "ban-button"} onClick={handleBanToggle}>
                        {managerInfo.manager.banned ? "Unban" : "Ban"}
                    </button>
                </div>
            </div>

            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity="info"
                    onClose={() => setToastOpen(false)}
                >
                    {toastMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ManagerCard;
