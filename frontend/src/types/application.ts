import type {CourseName} from "../enums/course-name.enum.ts";
import type {TariffName} from "../enums/tariff-name.enum.ts";
import type {CourseFormat} from "../enums/course-format.enum.ts";
import type {ApplicationStatus} from "../enums/application-status.enum.ts";

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

    startDate: Date;
    endDate: Date;

    message: string;
    utm: string;

    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export type ApplicationFilters = {
    page?: number;

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
}


export type ApplicationResponse = {
    applications?: Application[];
    total?: number;
    page?: number;
    limit?: number;
    pagesCount?: number
}