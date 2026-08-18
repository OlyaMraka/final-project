import {IBase} from "./base.interface";

export interface IGroup extends IBase {
    _id: string;
    name: string;
    courseId: string;
    courseType: string;
    
}