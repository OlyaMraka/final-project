import type {FC} from "react";
import {useSearchParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import type {PaginationProps} from "../../types/component-props/pagination.ts";
import "./custom-pagination.css";

const CustomPagination: FC<PaginationProps> = ({pagesCount}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page") ?? 1);

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", String(newPage));

        setSearchParams(params);
    };

    return (
        <Pagination
            size="large"
            page={page}
            count={pagesCount}
            onChange={handlePageChange}
            variant="outlined"
        />
    );
};

export default CustomPagination;
