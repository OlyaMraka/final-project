import { type FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {applicationSliceActions} from "../../redux/slices/application-slice.ts";

import ApplicationsTable from "../application-table/application-table.tsx";
import CustomPagination from "../pagination/custom-pagination.tsx";

import type {ApplicationFilters} from "../../types/application.ts";
import {ApplicationStatus} from "../../enums/application-status.enum.ts";
import {CourseFormat} from "../../enums/course-format.enum.ts";
import {CourseName} from "../../enums/course-name.enum.ts";
import {TariffName} from "../../enums/tariff-name.enum.ts";

const ApplicationsContainer: FC = () => {
    const [searchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const {applications} = useAppSelector(({ applicationSlice }) => applicationSlice);

    useEffect(() => {
        const filters: ApplicationFilters = {
            page: Number(searchParams.get("page") ?? 1),

            name: searchParams.get("name") || undefined,
            surname: searchParams.get("surname") || undefined,
            email: searchParams.get("email") || undefined,
            phone: searchParams.get("phone") || undefined,

            age: searchParams.get("age")
                ? Number(searchParams.get("age"))
                : undefined,

            course: searchParams.get("course") as CourseName | undefined,

            tariff: searchParams.get("tariff") as TariffName | undefined,

            format: searchParams.get("format") as CourseFormat | undefined,

            groupId: searchParams.get("groupId") || undefined,

            status: searchParams.get("status") as
                | ApplicationStatus
                | undefined,

            startDate: searchParams.get("startDate")
                ? new Date(searchParams.get("startDate")!)
                : undefined,

            endDate: searchParams.get("endDate")
                ? new Date(searchParams.get("endDate")!)
                : undefined,
        };

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

