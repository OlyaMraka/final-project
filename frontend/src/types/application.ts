import type {CourseName} from "../enums/course-name.enum.ts";
import type {TariffName} from "../enums/tariff-name.enum.ts";
import type {CourseFormat} from "../enums/course-format.enum.ts";
import type {ApplicationStatus} from "../enums/application-status.enum.ts";
import type {Group} from "./group.ts";
import type {ApplicationOwnerDto} from "./user.ts";
import {type OrderDirection, SortField} from "../enums/sort-field.enum.ts";

export type Application = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    age: number;
    phone: string;

    course: CourseName;
    format: CourseFormat;
    tariff: TariffName;
    status: ApplicationStatus;
    groupId: string;

    alreadyPaid: number;
    sum: number;

    managerId: string;

    message: string;
    utm: string;

    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface IApplicationResponse extends Omit<Application, "groupId" | "managerId"> {
    groupId: Group | null;
    managerId: ApplicationOwnerDto | null;
}

export type ApplicationFilters = {
    page?: number;

    sortOrder?: OrderDirection;
    sortField?: SortField;

    name?: string;
    surname?: string;
    email?: string;
    age?: number;
    phone?: string;

    course?: CourseName;
    tariff?: TariffName;
    format?: CourseFormat;
    groupId?: string;
    status?: ApplicationStatus;

    startDate?: Date;
    endDate?: Date;

    myApplications?: boolean;
}


export type ApplicationResponse = {
    applications?: IApplicationResponse[];
    total?: number;
    page?: number;
    limit?: number;
    pagesCount?: number
}