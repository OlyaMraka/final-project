import {type FC, useEffect} from "react";
import {useAppSelector} from "../../../redux/hooks/useAppSelector.tsx";
import {useSearchParams} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {useAppDispatch} from "../../../redux/hooks/useAppDispatch.tsx";
import {groupSliceActions} from "../../../redux/slices/group-slice.ts";
import "./custom-dropdown.css";

const GroupDropdown: FC = () => {
    const { groups } = useAppSelector(({groupSlice}) => groupSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            dispatch(groupSliceActions.getAllGroupsAction());
        } catch (error) {
            console.log(error);
        }
    }, []);

    const [query, setQuery] = useSearchParams();
    const value = query.get("groupId") ?? "";

    const handleChange = (event: SelectChangeEvent) => {
        const groupId = event.target.value;

        const params = new URLSearchParams(query);
        params.set("groupId", groupId);

        setQuery(params);
    };

    return (
        <FormControl className="dropdown-block">
            <InputLabel className="dropdown-input-label" id="group-select-label">Group</InputLabel>
            <Select className="dropdown-input-select"
                    labelId="group-simple-select"
                    id="group-select-label"
                    value={value}
                    label="Group"
                    onChange={handleChange}>

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
    );
};

export default GroupDropdown;
