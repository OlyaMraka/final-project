import {IBase} from "./base.interface";
import {ApplicationStatus} from "../enums/application-status.enum";
import {CourseName} from "../enums/course-name.enum";
import {CourseFormat} from "../enums/course-format.enum";
import {TariffName} from "../enums/tariff-name.enum";

export interface IApplication extends IBase {
    _id: string;
    name?: string;
    surname?: string;
    email?: string;
    age?: number;
    phone?: string;

    course?: CourseName;
    format?: CourseFormat;
    tariff?: TariffName;
    status?: ApplicationStatus;
    groupId?: string;

    alreadyPaid?: number;
    sum?: number;

    managerId?: string;

    message?: string;
    utm?: string;
}
