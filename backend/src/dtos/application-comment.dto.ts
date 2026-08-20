import {IComment} from "../interfaces/application-comment.interface";

export type CreateCommentDto = Pick<IComment, "text" | "applicationId">;
export type UpdateCommentDto = Pick<IComment, "text">;
