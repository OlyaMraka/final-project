import type {IApplicationResponse} from "../application.ts";

export type ApplicationsTableProps = {
    applications: IApplicationResponse[];
};

export type ApplicationRowProps = {
    application: IApplicationResponse;
};
