import type {FC} from "react";
import ApplicationStatisticsComponent from "../../components/application-statistics/appliaction-statistics.tsx";
import ManagersContainer from "../../components/managers-container/managers-container.tsx";

const AdminPage: FC = () => {
    return (
        <>
            <ApplicationStatisticsComponent/>
            <ManagersContainer/>
        </>
    );
};

export default AdminPage;
