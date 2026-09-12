import {IComment} from "../interfaces/application-comment.interface";
import {Comment} from "../models/application-comment.model";
import {CreateCommentDto, ICommentResponse, UpdateCommentDto} from "../dtos/application-comment.dto";
import {CommentOwnerDto} from "../dtos/user.dto";

class CommentRepository {
    public async getByApplicationId(applicationId: string): Promise<ICommentResponse[]> {
        const comments = await Comment.find({ applicationId })
            .populate<{ userId: CommentOwnerDto }>(
                "userId",
                "_id name surname"
            ).lean();

        return comments.map(({ userId, ...comment }) => ({
            ...comment,
            author: userId,
        }));
    }

    public async create(comment: CreateCommentDto): Promise<ICommentResponse> {
        const createdComment = await Comment.create(comment);

        const populatedComment = await createdComment.populate<{
            userId: CommentOwnerDto;
        }>("userId", "_id name surname");

        const { userId, ...commentData } = populatedComment.toObject();

        return {
            ...commentData,
            author: userId,
        };
    }

    public getById(commentId: string): Promise<IComment> {
        return Comment.findById(commentId);
    }

    public updateById(commentId: string, comment: UpdateCommentDto): Promise<IComment> {
        return Comment.findByIdAndUpdate(commentId, comment, { returnDocument: 'after' });
    }

    public deleteById(commentId: string): Promise<IComment> {
        return Comment.findByIdAndDelete(commentId);
    }
}

export const commentRepository = new CommentRepository();
