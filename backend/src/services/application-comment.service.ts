import {IComment} from "../interfaces/application-comment.interface";
import {CreateCommentDto, ICommentResponse, UpdateCommentDto} from "../dtos/application-comment.dto";
import {commentRepository} from "../repositories/application-comment.repository";
import {applicationRepository} from "../repositories/application.repository";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {ServiceConstants} from "../constants/error.constants";
import {applicationService} from "./application.service";

class CommentService {
    public async getByApplicationId(applicationId: string): Promise<ICommentResponse[]> {
        const application = await applicationRepository.getById(applicationId);
        if (!application) {
            throw new ApiError(StatusCodes.NOT_FOUND, ServiceConstants.APPLICATION_NOT_FOUND);
        }

        return commentRepository.getByApplicationId(applicationId);
    }

    public getById(commentId: string): Promise<IComment | null> {
        return commentRepository.getById(commentId);
    }

    public async create(comment: CreateCommentDto): Promise<ICommentResponse> {
        const application = await applicationRepository.getById(comment.applicationId);
        if (!application) {
            throw new ApiError(StatusCodes.NOT_FOUND, ServiceConstants.APPLICATION_NOT_FOUND);
        }

        if (application.managerId && application.managerId.toString() !== comment.userId.toString()) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.COMMENT_NOT_ALLOWED);
        }

        if(!application.managerId) {
            await applicationService.setManager(application._id, { managerId: comment.userId});
        }

        return commentRepository.create(comment);
    }

    public async updateById(commentId: string, comment: UpdateCommentDto): Promise<IComment> {
        const updatedComment = await commentRepository.updateById(commentId, comment);
        if (!updatedComment) {
            throw new ApiError(StatusCodes.NOT_FOUND, ServiceConstants.COMMENT_NOT_FOUND);
        }
        return updatedComment;
    }

    public async deleteById(commentId: string): Promise<IComment> {
        const deletedComment = await commentRepository.deleteById(commentId);
        if (!deletedComment) {
            throw new ApiError(StatusCodes.NOT_FOUND, ServiceConstants.COMMENT_NOT_FOUND);
        }
        return deletedComment;
    }
}

export const commentService = new CommentService();
