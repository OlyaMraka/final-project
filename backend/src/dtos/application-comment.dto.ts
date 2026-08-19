import {IComment} from "../interfaces/application-comment.interface";

export type CreateCommentDto = Pick<IComment, "text" | "leadId">;
export type UpdateCommentDto = Pick<IComment, "text">;
