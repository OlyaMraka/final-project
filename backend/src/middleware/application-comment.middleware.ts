import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../interfaces/token.interface";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {MiddlewareConstants} from "../constants/error.constants";
import {commentService} from "../services/application-comment.service";

class ApplicationCommentMiddleware {
    public checkAuthorAccess() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const tokenPayload = res.locals.tokenPayload as ITokenPayload;
                const { userId } = tokenPayload;

                const { id } = req.params;
                const comment = await commentService.getById(id as string);

                if(comment.userId && comment.userId.toString() !== userId.toString()) {
                    throw new ApiError(StatusCodes.FORBIDDEN, MiddlewareConstants.NO_ACCESS_TO_EDIT_COMMENT);
                }
                next();
            } catch (error) {
                next(error);
            }
        }
    }
}

export const applicationCommentMiddleware = new ApplicationCommentMiddleware();