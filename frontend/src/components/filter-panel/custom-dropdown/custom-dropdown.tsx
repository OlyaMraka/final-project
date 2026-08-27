import {type FC} from "react";
import type {DropdownProps} from "../../../types/component-props/dropdown.ts";
import {FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import "./custom-dropdown.css";
import {setSearchParam} from "../../../helpers/application-filters.helper.ts";

const CustomDropdown: FC<DropdownProps> = ({queryParam, values, label}) => {

    const [query, setQuery] = useSearchParams();
    const value = query.get(queryParam) ?? '';

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;

        setQuery(prev =>
            setSearchParam(prev, queryParam, newValue));
    };

    return (
        <FormControl className="dropdown-block">
            <InputLabel className="dropdown-input-label" id={`${queryParam}-select-label`}>{label}</InputLabel>
            <Select className="dropdown-input-select"
                labelId={`${queryParam}-simple-select`}
                label={label}
                id={`${queryParam}-select-label`}
                value={value}
                onChange={handleChange}>

                {values.map(value => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomDropdown;
