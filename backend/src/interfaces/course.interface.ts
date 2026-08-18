import {IBase} from "./base.interface";
import {CourseName} from "../enums/courseName.enum";

export interface ICourse extends IBase {
    _id: string;
    name: CourseName;
}
