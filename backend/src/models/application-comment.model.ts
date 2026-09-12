import {model, Schema} from "mongoose";
import {IComment} from "../interfaces/application-comment.interface";
import {User} from "./user.model";

const leadCommentModel = new Schema(
    {
        text: {type: String, required: true},
        applicationId: {type: Schema.Types.ObjectId, required: true},
        userId: { type: Schema.Types.ObjectId, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Comment = model<IComment>("Comment", leadCommentModel);
