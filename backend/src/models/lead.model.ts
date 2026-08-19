import {model, Schema} from "mongoose";
import {LeadStatus} from "../enums/leadStatus";
import {Group} from "./group.model";
import {CourseTariff} from "./courseTariff.model";
import {User} from "./user.model";
import {ILead} from "../interfaces/lead.interface";

const leadSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: {type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: String, required: true },
        courseTariffId: { type: Schema.Types.ObjectId, ref: CourseTariff, required: true },
        status: { type: String, enum: Object.values(LeadStatus),
            default: LeadStatus.NEW, required: true },
        groupId: { type: Schema.Types.ObjectId, ref: Group, required: true },
        alreadyPaid: { type: Number, required: true },
        managerId: { type: Schema.Types.ObjectId, ref: User, required: true },
        startDate: { type: Date, required: true},
        endDate: { type: Date, required: true}
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Lead = model<ILead>("Lead", leadSchema);
