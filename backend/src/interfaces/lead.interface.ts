import {IBase} from "./base.interface";
import {LeadStatus} from "../enums/leadStatus";

export interface ILead extends IBase {
    _id: string;
    name: string;
    surname: string;
    email: string;
    age: number;
    phone: string;
    courseTariffId: string;
    status: LeadStatus;
    groupId: string;
    alreadyPaid: number;
    managerId: string;
    startDate: Date;
    endDate: Date;
}
