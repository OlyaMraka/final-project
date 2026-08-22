import type {FC} from "react";
import FilterPanel from "../../components/filter-panel/filter-panel.tsx";
import ApplicationsContainer from "../../components/application-container/application-container.tsx";

const HomePage: FC = () => {
    return (
        <div>
            <FilterPanel/>
            <ApplicationsContainer/>
        </div>
    );
};

export default HomePage;
