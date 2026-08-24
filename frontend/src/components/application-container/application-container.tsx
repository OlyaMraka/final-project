import { type FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {applicationSliceActions} from "../../redux/slices/application-slice.ts";
import ApplicationsTable from "../application-table/application-table.tsx";
import CustomPagination from "../pagination/custom-pagination.tsx";
import {getApplicationFiltersFromSearchParams} from "../../helpers/application-filters.helper.ts";

const ApplicationsContainer: FC = () => {
    const [searchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const {applications} = useAppSelector(({ applicationSlice }) => applicationSlice);

    useEffect(() => {
        const filters = getApplicationFiltersFromSearchParams(searchParams);

        dispatch(applicationSliceActions.getAllApplicationsWithFilters(filters));
    }, [searchParams, dispatch]);

    return (
        <>
            <ApplicationsTable
                applications={applications}/>

            <CustomPagination/>
        </>
    );
};

export default ApplicationsContainer;

