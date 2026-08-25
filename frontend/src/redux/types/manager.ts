import type {ManagerDto} from "../../types/user.ts";

export type ManagerSliceType = {
    managers?: ManagerDto[];
    total?: number;
    limit?: number;
    page?: number;
    pageCount?: number;
}