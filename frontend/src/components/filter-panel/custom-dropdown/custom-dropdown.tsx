import {type FC, useState} from "react";
import type {DropdownProps} from "../../../types/dropdown.ts";
import {FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import "./custom-dropdown.css";

const CustomDropdown: FC<DropdownProps> = ({queryParam, values, label}) => {
    const [value, setValue] = useState('');
    const [query, setQuery] = useSearchParams();

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setValue(newValue);

        const params = new URLSearchParams(query);
        params.set(queryParam, newValue);

        setQuery(params);
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
