import type { FC } from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import type {FormDropdownProps} from "../../../types/component-props/edit-application-form.ts";
import "./form-dropdown.css";

const FormDropdown: FC<FormDropdownProps> = ({label, name, value, values, onChange}) => {
    return (
        <FormControl className="dropdown-block">
            <InputLabel className="dropdown-input-label" id={`${name}-select-label`}>
                {label}
            </InputLabel>

            <Select className="dropdown-input-select" labelId={`${name}-select-label`}
                    id={`${name}-select`} name={name} value={value} label={label}
                    onChange={onChange}>

                {values.map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FormDropdown;
