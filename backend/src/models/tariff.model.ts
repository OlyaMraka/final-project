import {model, Schema} from "mongoose";
import {ITariff} from "../interfaces/tariff.interface";

const tariffSchema = new Schema (
    {
        name: {type: String, required: true, unique: true}
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Tariff = model<ITariff>("Tariff", tariffSchema);
