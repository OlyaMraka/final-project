import {IBase} from "./base.interface";

export interface IComment extends IBase {
    _id: string;
    text: string;
    leadId: string;
}