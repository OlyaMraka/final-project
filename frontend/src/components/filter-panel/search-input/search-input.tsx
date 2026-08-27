import {type ChangeEvent, type FC, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {TextField} from "@mui/material";
import type {SearchInputProps} from "../../../types/component-props/search-input.ts";
import "./search-input.css";
import {setSearchParam} from "../../../helpers/application-filters.helper.ts";

const SearchInput: FC<SearchInputProps> = ({label, queryParam}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [value, setValue] = useState(
        searchParams.get(queryParam) ?? ""
    );

    useEffect(() => {
        setValue(searchParams.get(queryParam) ?? "");
    }, [searchParams, queryParam]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchParams(prev =>
                setSearchParam(prev, queryParam, value)
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            className="custom-text-input"
            id={`${label}-outlined-input`}
            label={label}
            type="search"
            value={value}
            onChange={handleChange}
        />
    );
};

export default SearchInput;