import {NextFunction, Request, Response} from "express";
import {commentService} from "../services/application-comment.service";
import {StatusCodes} from "../enums/status-codes";
import {CreateCommentDto, UpdateCommentDto} from "../dtos/application-comment.dto";

class CommentController {
    public async GetCommentsByApplicationId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await commentService.getByLeadId(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentDto = req.body as CreateCommentDto;
            const data = await commentService.create(commentDto);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const commentDto = req.body as UpdateCommentDto;
            const data = await commentService.updateById(id as string, commentDto);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await commentService.deleteById(id as string);
            res.status(StatusCodes.OK).end();
        } catch (error) {
            next(error);
        }
    }
}

export const commentController = new CommentController();
