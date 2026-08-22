import { type FC } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import "./date-picker.css";

const DateFilters: FC = () => {
    const [query, setQuery] = useSearchParams();

    const dateFrom = query.get("startDate");
    const dateTo = query.get("endDate");

    const handleFromChange = (newValue: Dayjs | null) => {
        const params = new URLSearchParams(query);

        if (newValue) {
            params.set("startDate", newValue.format("YYYY-MM-DD"));
        } else {
            params.delete("startDate");
        }

        setQuery(params);
    };

    const handleToChange = (newValue: Dayjs | null) => {
        const params = new URLSearchParams(query);

        if (newValue) {
            params.set("endDate", newValue.format("YYYY-MM-DD"));
        } else {
            params.delete("endDate");
        }

        setQuery(params);
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
