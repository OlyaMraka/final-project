import {IComment} from "../interfaces/application-comment.interface";
import {CreateCommentDto, ICommentResponse, UpdateCommentDto} from "../dtos/application-comment.dto";
import {commentRepository} from "../repositories/application-comment.repository";

class CommentService {
    public getByApplicationId(applicationId: string): Promise<ICommentResponse[]> {
        return commentRepository.getByApplicationId(applicationId);
    }

    public getById(commentId: string): Promise<IComment> {
        return commentRepository.getById(commentId);
    }

    public create(comment: CreateCommentDto): Promise<ICommentResponse> {
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
