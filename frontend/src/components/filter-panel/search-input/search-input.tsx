import {type ChangeEvent, type FC} from "react";
import type {SearchInputProps} from "../../../types/component-props/search-input.ts";
import {useSearchParams} from "react-router-dom";
import {TextField} from "@mui/material";
import "./search-input.css";

const SearchInput: FC<SearchInputProps> = ({label, queryParam}) => {
    const [query, setQuery] = useSearchParams();

    const value = query.get(queryParam) ?? '';

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as string;

        const params = new URLSearchParams(query);
        if(newValue) {
            params.set(queryParam, newValue);
        } else {
            params.delete(queryParam);
        }

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
