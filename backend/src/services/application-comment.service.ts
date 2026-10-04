import {IComment} from "../interfaces/application-comment.interface";
import {CreateCommentDto, ICommentResponse, UpdateCommentDto} from "../dtos/application-comment.dto";
import {commentRepository} from "../repositories/application-comment.repository";
import {applicationRepository} from "../repositories/application.repository";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {ServiceConstants} from "../constants/error.constants";
import {applicationService} from "./application.service";

class CommentService {
    public getByApplicationId(applicationId: string): Promise<ICommentResponse[]> {
        return commentRepository.getByApplicationId(applicationId);
    }

    public getById(commentId: string): Promise<IComment> {
        return commentRepository.getById(commentId);
    }

    public async create(comment: CreateCommentDto): Promise<ICommentResponse> {
        const application = await applicationRepository.getById(comment.applicationId);

        if (application.managerId && application.managerId.toString() !== comment.userId.toString()) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.COMMENT_NOT_ALLOWED);
        }

        if(!application.managerId) {
            await applicationService.setManager(application._id, { managerId: comment.userId});
        }

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
