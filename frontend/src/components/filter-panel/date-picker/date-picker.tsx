import { type FC } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import "./date-picker.css";
import {setSearchParam} from "../../../helpers/application-filters.helper.ts";

const DateFilters: FC = () => {
    const [query, setQuery] = useSearchParams();

    const dateFrom = query.get("startDate");
    const dateTo = query.get("endDate");

    const handleFromChange = (newValue: Dayjs | null) => {
        setQuery(prev =>
            setSearchParam(prev, "startDate", newValue.format("YYYY-MM-DD"))
        );
    };

    const handleToChange = (newValue: Dayjs | null) => {
        setQuery(prev =>
            setSearchParam(prev, "endDate", newValue.format("YYYY-MM-DD"))
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="date-filters">
                <DatePicker
                    label="Date from"
                    value={dateFrom ? dayjs(dateFrom) : null}
                    onChange={handleFromChange}
                />

                <DatePicker
                    label="Date to"
                    value={dateTo ? dayjs(dateTo) : null}
                    onChange={handleToChange}
                />
            </div>
        </LocalizationProvider>
    );
};

export default DateFilters;
