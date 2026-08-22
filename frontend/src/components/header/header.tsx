import type {FC} from "react";
import Logo from "../../assets/crm-logo.png";
import {Link} from "react-router-dom";
import {AdminPanelSettingsOutlined, LogoutOutlined} from "@mui/icons-material";
import "./header.css";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {RoleName} from "../../enums/role-name.enum.ts";

const Header: FC = () => {

    const {user} = useAppSelector(({userSlice}) => userSlice);

    return (
        <div className="header-block">
            <div className="logo-container">
                <img src={Logo} alt="logo"/>
            </div>

            <div className="operations-block">
                {
                    user?.role === RoleName.ADMIN &&
                    <Link className="admin-panel-button" to={"/admin-panel"}>
                        Admin panel
                        <AdminPanelSettingsOutlined/>
                    </Link>
                }

                <Link className="log-out-button" to={"/"}>
                    Log Out
                    <LogoutOutlined/>
                </Link>
            </div>
        </div>
    );
};

export default Header;
