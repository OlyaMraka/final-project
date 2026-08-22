import {type ChangeEvent, type FC, useState} from "react";
import type {SearchInputProps} from "../../../types/search-input.ts";
import {useSearchParams} from "react-router-dom";
import {TextField} from "@mui/material";
import "./search-input.css";

const SearchInput: FC<SearchInputProps> = ({label, queryParam}) => {
    const [value, setValue] = useState('');
    const [query, setQuery] = useSearchParams();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as string;
        setValue(newValue);

        const params = new URLSearchParams(query);
        params.set(queryParam, newValue);

        setQuery(params);
    };

    return (
        <TextField className="custom-text-input"
            id="outlined-search"
            label={label}
            type="search"
            value={value}
            onChange={handleChange}
        />
    );
}

export default SearchInput;
