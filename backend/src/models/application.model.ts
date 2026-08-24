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
        name: { type: String, required: true },
        surname: {type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: String, required: true },

        course: { type: String, enum: Object.values(CourseName), required: true },
        format: { type: String, enum: Object.values(CourseFormat), required: true },
        tariff: { type: String, enum: Object.values(TariffName), required: true },
        status: { type: String, enum: Object.values(ApplicationStatus),
            default: ApplicationStatus.NEW, required: true },
        groupId: { type: Schema.Types.ObjectId, ref: Group, required: true },

        alreadyPaid: { type: Number, required: true },
        sum: { type: Number, required: true },

        managerId: { type: Schema.Types.ObjectId, ref: User },

        message: { type: String, required: true },
        utm: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Application = model<IApplication>("Application", applicationSchema);
