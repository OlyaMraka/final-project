import {ILead} from "../interfaces/lead.interface";
import {OrderDirection, SortField} from "../enums/sortField.enum";

export type LeadDto = Pick<ILead,
    "name" |
    "surname" |
    "email" |
    "age" |
    "phone" |
    "courseTariffId" |
    "groupId" |
    "status" |
    "alreadyPaid">;

export type LeadFilters = {
    page?: number;

    sortOrder?: OrderDirection;
    sortField?: SortField;

    name?: string;
    surname?: string;
    email?: string;
    age?: number;
    courseName?: string;
    courseFormat?: string;
    courseTariff?: string;
    groupName?: string;
    phone?: string;
    status?: string;
    alreadyPaid?: number;
}
