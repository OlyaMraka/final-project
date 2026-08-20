import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../interfaces/token.interface";
import {applicationService} from "../services/application.service";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {MiddlewareConstants} from "../constants/error.constants";

class ApplicationMiddleware {
    public checkUpdateAccess() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const tokenPayload = res.locals.tokenPayload as ITokenPayload;
                const { userId } = tokenPayload;

                const { id } = req.params;
                const application = await applicationService.getById(id as string);

                if(application.managerId && application.managerId.toString() !== userId.toString()) {
                    throw new ApiError(StatusCodes.FORBIDDEN, MiddlewareConstants.NO_ACCESS_TO_EDIT_REQUEST);
                }
                next();
            } catch (error) {
                next(error);
            }
        }
    }
}

export const applicationMiddleware = new ApplicationMiddleware();
