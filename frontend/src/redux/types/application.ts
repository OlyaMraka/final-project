import type {IApplicationResponse} from "../../types/application.ts";

export type ApplicationSliceType = {
    applications?: IApplicationResponse[];
    total?: number;
    page?: number;
    limit?: number;
    pagesCount?: number
}
