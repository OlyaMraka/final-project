import type { FC } from "react";
import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,} from "@mui/material";
import { useAppSelector } from "../../../redux/hooks/useAppSelector.tsx";
import type {ApplicationGroupDropdownProps} from "../../../types/component-props/edit-application-form.ts";
import "./form-dropdown.css";

const ApplicationGroupDropdown: FC<ApplicationGroupDropdownProps> = ({groupId, onGroupChange}) => {
    const { groups } = useAppSelector(({ groupSlice }) => groupSlice);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;

        onGroupChange(value === "" ? null : value);
    };

    return (
        <>
            <div className="application-group-block">
                <FormControl className="dropdown-block">
                    <InputLabel
                        className="dropdown-input-label"
                        id="group-select-label"
                    >
                        Group
                    </InputLabel>

                    <Select
                        className="dropdown-input-select"
                        labelId="group-simple-select"
                        id="group-select"
                        value={groupId ?? ""}
                        label="Group"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            Not selected
                        </MenuItem>

                        {groups.map(group => (
                            <MenuItem
                                key={group._id}
                                value={group._id}
                            >
                                {group.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


            </div>
        </>
    );
};

export default ApplicationGroupDropdown;
