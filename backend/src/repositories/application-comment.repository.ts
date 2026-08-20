import {IComment} from "../interfaces/application-comment.interface";
import {Comment} from "../models/application-comment.model";
import {CreateCommentDto, UpdateCommentDto} from "../dtos/application-comment.dto";

class CommentRepository {
    public getByLeadId(applicationId: string): Promise<IComment[]> {
        return Comment.find({applicationId});
    }

    public create(comment: CreateCommentDto): Promise<IComment> {
        return Comment.create(comment);
    }

    public updateById(commentId: string, comment: UpdateCommentDto): Promise<IComment> {
        return Comment.findByIdAndUpdate(commentId, comment, { returnDocument: 'after' });
    }

    public deleteById(commentId: string): Promise<IComment> {
        return Comment.findByIdAndDelete(commentId);
    }
}

export const commentRepository = new CommentRepository();
