import {model, Schema} from "mongoose";
import {ICourse} from "../interfaces/course.interface";
import {CourseName} from "../enums/courseName.enum";

const courseSchema = new Schema (
    {
        name: {type: String, required: true, unique: true,
            enum: Object.values(CourseName)}
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Course = model<ICourse>("Course", courseSchema);
