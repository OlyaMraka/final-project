import {ApplicationStatus} from "../enums/application-status.enum";

export type StatusCount = {
    status: ApplicationStatus;
    applicationCount: number;
}

export type ApplicationStatistics = {
    total: number;
    statusStatistics: StatusCount[];
}