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
import {Checkbox, FormControlLabel} from "@mui/material";
import {FileUploadOutlined, RefreshOutlined} from "@mui/icons-material";
import {useSearchParams} from "react-router-dom";
import {getApplicationFiltersFromSearchParams} from "../../helpers/application-filters.helper.ts";
import {exportApplications} from "../../services/application.service.ts";

const FilterPanel: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClearFilters = () => {
        setSearchParams({});
    };

    const handleExport = async () => {
        try {
            const filters = getApplicationFiltersFromSearchParams(searchParams);

            const blob = await exportApplications(filters);

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "applications.xlsx";

            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

    const isMyApplications = searchParams.get("myApplications") === "true";

    const handleMyApplicationsChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const params = new URLSearchParams(searchParams);

        if (event.target.checked) {
            params.set("myApplications", "true");
        } else {
            params.delete("myApplications");
        }

        params.set("page", "1");

        setSearchParams(params);
    };

    return (
        <div className="filter-panel-container">
            <div className="left-part-filters">
                <div className="first-row">
                    <SearchInput label="Name" queryParam="name"/>
                    <SearchInput label="Surname" queryParam="surname"/>
                    <SearchInput label="Email" queryParam="email"/>
                    <SearchInput label="Phone" queryParam="phone"/>
                </div>

                <div className="second-row">
                    <SearchInput label="Age" queryParam="age"/>
                    <CustomDropdown queryParam="course" label="Course" values={Object.values(CourseName)}/>
                    <CustomDropdown queryParam="format" label="Format" values={Object.values(CourseFormat)}/>
                    <CustomDropdown queryParam="tariff" label="Tariff" values={Object.values(TariffName)}/>
                </div>

                <div className="third-row">
                    <CustomDropdown queryParam="status" label="Status" values={Object.values(ApplicationStatus)}/>
                    <GroupDropdown/>
                    <DateFilters/>
                </div>
            </div>

            <div className="right-part-actions">
                <button className="action-button" onClick={handleClearFilters}>
                    <RefreshOutlined fontSize="small" />
                    <span>Clear filters</span>
                </button>

                <button className="action-button" onClick={handleExport}>
                    <FileUploadOutlined fontSize="small" />
                    <span>Create Table</span>
                </button>

                <FormControlLabel control={<Checkbox checked={isMyApplications}
                                                     onChange={handleMyApplicationsChange}/>}label="My applications" />
            </div>
        </div>
    )
};

export default FilterPanel;
