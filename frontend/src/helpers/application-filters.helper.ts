import type { ApplicationFilters } from "../types/application.ts";
import type { CourseName } from "../enums/course-name.enum.ts";
import type { TariffName } from "../enums/tariff-name.enum.ts";
import type { CourseFormat } from "../enums/course-format.enum.ts";
import type { ApplicationStatus } from "../enums/application-status.enum.ts";
import type { SortField, OrderDirection } from "../enums/sort-field.enum.ts";

export const getApplicationFiltersFromSearchParams = (
    searchParams: URLSearchParams
): ApplicationFilters => {
    return {
        page: Number(searchParams.get("page") ?? 1),

        sortField: searchParams.get("sortField") as SortField | undefined,
        sortOrder: searchParams.get("sortOrder") as OrderDirection | undefined,

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

        status: searchParams.get("status") as ApplicationStatus | undefined,

        startDate: searchParams.get("startDate")
            ? new Date(searchParams.get("startDate")!)
            : undefined,

        endDate: searchParams.get("endDate")
            ? new Date(searchParams.get("endDate")!)
            : undefined,
    };
};
