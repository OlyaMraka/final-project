import type {FC} from "react";
import type {ManagerCardProps} from "../../types/component-props/manager-card.ts";
import "./manager-card.css";

const ManagerCard: FC<ManagerCardProps> = ({managerInfo}) => {
    return (
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
                { !managerInfo.manager.isActive && <button className="activate-button">Activate</button> }
                { managerInfo.manager.isActive && <button className="recover-password-button">Recover password</button> }
                <button className={managerInfo.manager.banned ? "unban-button" : "ban-button"}>
                    {managerInfo.manager.banned ? "Unban" : "Ban"}
                </button>
            </div>
        </div>
    );
};

export default ManagerCard;
