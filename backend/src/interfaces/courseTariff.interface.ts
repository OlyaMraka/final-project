import {IBase} from "./base.interface";
import {CourseType} from "../enums/courseType";

export interface ICourseTariff extends IBase {
    _id: string;
    price: number;
    courseId: string;
    tariffId: string;
    courseFormat: CourseType;
}