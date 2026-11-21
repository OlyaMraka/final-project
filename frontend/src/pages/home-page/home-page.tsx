import type {FC} from "react";
import {Alert} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import FilterPanel from "../../components/filter-panel/filter-panel.tsx";
import ApplicationsContainer from "../../components/application-container/application-container.tsx";

const HomePage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const accessDenied = (location.state as {accessDenied?: boolean} | null)?.accessDenied;

    return (
        <div>
            {accessDenied && (
                <Alert
                    severity="warning"
                    sx={{mb: 3}}
                    onClose={() => navigate(location.pathname, {replace: true, state: null})}
                >
                    Access denied. You need administrator permissions to open the admin panel.
                </Alert>
            )}
            <FilterPanel/>
            <ApplicationsContainer/>
        </div>
    );
};

export default HomePage;
