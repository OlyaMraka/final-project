import type {FC} from "react";
import SearchInput from "./search-input/search-input.tsx";
import CustomDropdown from "./custom-dropdown/custom-dropdown.tsx";
import {CourseName} from "../../enums/course-name.enum.ts";
import {CourseFormat} from "../../enums/course-format.enum.ts";
import {TariffName} from "../../enums/tariff-name.enum.ts";
import {ApplicationStatus} from "../../enums/application-status.enum.ts";
import GroupDropdown from "./custom-dropdown/group-dropdown.tsx";
import DateFilters from "./date-picker/date-picker.tsx";
import "./filter-panel.css";

const FilterPanel: FC = () => {
    return (
        <div className="filter-panel-container">
            <div className="first-row">
                <SearchInput label="Name" queryParam="name"/>
                <SearchInput label="Surname" queryParam="surname"/>
                <SearchInput label="Email" queryParam="email"/>
                <SearchInput label="Phone" queryParam="phone"/>
                <SearchInput label="Age" queryParam="age"/>
                <CustomDropdown queryParam="course" label="Course" values={Object.values(CourseName)}/>
            </div>

            <div className="second-row">
                <CustomDropdown queryParam="format" label="Format" values={Object.values(CourseFormat)}/>
                <CustomDropdown queryParam="tariff" label="Tariff" values={Object.values(TariffName)}/>
                <CustomDropdown queryParam="status" label="Status" values={Object.values(ApplicationStatus)}/>
                <GroupDropdown/>
                <DateFilters/>
            </div>
        </div>
    )
};

export default FilterPanel;
