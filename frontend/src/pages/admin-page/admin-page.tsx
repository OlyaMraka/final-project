import {type FC, useState} from "react";
import ApplicationStatisticsComponent from "../../components/application-statistics/appliaction-statistics.tsx";
import ManagersContainer from "../../components/managers-container/managers-container.tsx";
import {Dialog} from "@mui/material";
import CreateManagerForm from "../../components/create-manager-form/create-manager-form.tsx";
import "./admin-page.css";

const AdminPage: FC = () => {
    const [isCreateManagerOpen, setIsCreateManagerOpen] = useState(false);

    const handleOpenCreateManager = () => {
        setIsCreateManagerOpen(true);
    };

    const handleCloseCreateManager = () => {
        setIsCreateManagerOpen(false);
    };

    return (
        <>
            <ApplicationStatisticsComponent
                onCreateManager={handleOpenCreateManager}
            />

            <ManagersContainer />

            <Dialog
                open={isCreateManagerOpen}
                onClose={handleCloseCreateManager}
                fullWidth
                maxWidth="sm"
                slotProps={{ paper: { className: "create-manager-dialog-paper" } }}
            >
                <CreateManagerForm
                    onClose={handleCloseCreateManager}
                />
            </Dialog>
        </>
    );
};

export default AdminPage;
