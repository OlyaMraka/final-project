import {type FC} from "react";
import {Outlet} from "react-router-dom";

const MainLayout: FC = () => {
    return (
        <div className="main-layout-container">
            <Outlet/>
        </div>
    );
};

export default MainLayout;
