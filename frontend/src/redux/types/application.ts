import type {Application} from "../../types/application.ts";

export type ApplicationSliceType = {
    applications?: Application[];
    total?: number;
    page?: number;
    limit?: number;
    pagesCount?: number
}
