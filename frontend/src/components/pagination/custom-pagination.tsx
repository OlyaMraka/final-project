import type {FC} from "react";
import {useSearchParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import "./custom-pagination.css";

const CustomPagination: FC = () => {
    const {pagesCount} = useAppSelector(({applicationSlice}) => applicationSlice);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page") ?? 1);

    const handlePageChange = (
        _: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", String(newPage));

        setSearchParams(params);
    };

    return (
        <Pagination
            page={page}
            count={pagesCount}
            onChange={handlePageChange}
            variant="outlined"
        />
    );
};

export default CustomPagination;
