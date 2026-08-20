import {NextFunction, Request, Response} from "express";
import {ApplicationFilters, SetManagerDto} from "../dtos/application.dto";
import {StatusCodes} from "../enums/status-codes";
import {applicationService} from "../services/application.service";

class ApplicationController {
    public async getAllLeads(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await applicationService.getAll(res.locals.query as ApplicationFilters);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async SetManager(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const manager = req.body as SetManagerDto;
            const data = await applicationService.setManager(id as string, manager);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const applicationController = new ApplicationController();
