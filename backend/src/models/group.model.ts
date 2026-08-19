import {model, Schema} from "mongoose";
import {CourseTariff} from "./courseTariff.model";
import {IGroup} from "../interfaces/group.interface";

const groupSchema = new Schema(
    {
        name: { type: String, required: true },
        courseTariffId: { type: Schema.Types.ObjectId, ref: CourseTariff, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Group = model<IGroup>("Group", groupSchema);
