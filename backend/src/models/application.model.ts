import {model, Schema} from "mongoose";
import {ApplicationStatus} from "../enums/application-status.enum";
import {Group} from "./group.model";
import {User} from "./user.model";
import {IApplication} from "../interfaces/application.interface";
import {CourseName} from "../enums/course-name.enum";
import {CourseFormat} from "../enums/course-format.enum";
import {TariffName} from "../enums/tariff-name.enum";

const applicationSchema = new Schema(
    {
        name: { type: String },
        surname: {type: String },
        email: { type: String },
        age: { type: Number },
        phone: { type: String },

        course: { type: String, enum: Object.values(CourseName) },
        format: { type: String, enum: Object.values(CourseFormat) },
        tariff: { type: String, enum: Object.values(TariffName) },
        status: { type: String, enum: Object.values(ApplicationStatus),
            default: ApplicationStatus.NEW },
        groupId: { type: Schema.Types.ObjectId, ref: Group },

        alreadyPaid: { type: Number },
        sum: { type: Number },

        managerId: { type: Schema.Types.ObjectId, ref: User },

        message: { type: String },
        utm: { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Application = model<IApplication>("Application", applicationSchema);
