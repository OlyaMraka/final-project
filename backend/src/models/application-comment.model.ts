import {model, Schema} from "mongoose";
import {IComment} from "../interfaces/application-comment.interface";

const leadCommentModel = new Schema(
    {
        text: {type: String, required: true},
        leadId: {type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Comment = model<IComment>("Comment", leadCommentModel);
