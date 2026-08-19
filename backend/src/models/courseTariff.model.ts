import {model, Schema} from "mongoose";
import {Course} from "./course.model";
import {Tariff} from "./tariff.model";
import {CourseType} from "../enums/courseType";
import {ICourseTariff} from "../interfaces/courseTariff.interface";

const courseTariffSchema = new Schema(
    {
        price: { type: Number, required: true },
        courseId: { type: Schema.Types.ObjectId, ref: Course, required: true },
        tariffId: { type: Schema.Types.ObjectId, ref: Tariff, required: true },
        courseFormat: { type: String, enum: Object.values(CourseType),
            required: true, default: CourseType.ONLINE },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CourseTariff = model<ICourseTariff>("CourseTariff", courseTariffSchema);
