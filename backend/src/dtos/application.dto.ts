import {IApplication} from "../interfaces/application.interface";
import {OrderDirection, SortField} from "../enums/sort-field.enum";
import {CourseFormat} from "../enums/course-format.enum";
import {CourseName} from "../enums/course-name.enum";
import {TariffName} from "../enums/tariff-name.enum";
import {ApplicationStatus} from "../enums/application-status.enum";

export type ApplicationDto = Pick<IApplication,
    "name" |
    "surname" |
    "email" |
    "age" |
    "phone" |

    "course" |
    "tariff" |
    "format" |
    "groupId" |
    "status" |

    "alreadyPaid" |
    "sum">;

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
}

export type SetManagerDto = {
    managerId: string;
}
