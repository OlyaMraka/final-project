import {IComment} from "../interfaces/application-comment.interface";
import {CommentOwnerDto} from "./user.dto";

export type CreateCommentDto = Pick<IComment, "text" | "applicationId" | "userId">;
export type UpdateCommentDto = Pick<IComment, "text">;

export interface ICommentResponse extends Omit<IComment, "userId"> {
    author: CommentOwnerDto;
}
