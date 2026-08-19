import {ICourseTariff} from "../interfaces/courseTariff.interface";

export type CourseTariffDto = Pick<ICourseTariff,
    "price" |
    "courseId" |
    "tariffId" |
    "courseFormat">