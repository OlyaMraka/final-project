import { Schema, model } from "mongoose"
import {IUser} from "../interfaces/user.interface";
import {RoleName} from "../enums/role-name.enum";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        deleted: { type: Boolean, default: false },
        role: { type: String, enum: Object.values(RoleName),
            default: RoleName.MANAGER, required: true },
        isActive: { type: Boolean, default: false },
        lastLogin: { type: Date },
        banned: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const User = model<IUser>("User", userSchema);
