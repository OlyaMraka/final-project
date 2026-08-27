import {IApplication} from "../interfaces/application.interface";
import {OrderDirection, SortField} from "../enums/sort-field.enum";
import {CourseFormat} from "../enums/course-format.enum";
import {CourseName} from "../enums/course-name.enum";
import {TariffName} from "../enums/tariff-name.enum";
import {ApplicationStatus} from "../enums/application-status.enum";
import {IGroup} from "../interfaces/group.interface";
import {ApplicationOwnerDto} from "./user.dto";

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

export interface IApplicationResponse extends Omit<IApplication, "groupId" | "managerId"> {
    groupId: IGroup | null;
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
    myId?: string
}

export type ApplicationExcelRow = {
    applicationId: string;

    name: string;
    surname: string;
    email: string;
    phone: string;

    course: string;
    tariff: string;
    format: string;
    status: string;

    sum: number;
    alreadyPaid: number;

    managerId: string;
    managerName: string;
    managerSurname: string;

    groupId: string;
    groupName: string;
};
