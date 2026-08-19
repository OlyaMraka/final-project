import {IComment} from "../interfaces/application-comment.interface";
import {CreateCommentDto, UpdateCommentDto} from "../dtos/application-comment.dto";
import {commentRepository} from "../repositories/application-comment.repository";

class CommentService {
    public getByLeadId(leadId: string): Promise<IComment[]> {
        return commentRepository.getByLeadId(leadId);
    }

    public create(comment: CreateCommentDto): Promise<IComment> {
        return commentRepository.create(comment);
    }

    public updateById(commentId: string, comment: UpdateCommentDto): Promise<IComment> {
        return commentRepository.updateById(commentId, comment);
    }

    public deleteById(commentId: string): Promise<IComment> {
        return commentRepository.deleteById(commentId);
    }
}

export const commentService = new CommentService();
