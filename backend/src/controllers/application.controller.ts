import {NextFunction, Request, Response} from "express";
import {ApplicationDto, ApplicationFilters} from "../dtos/application.dto";
import {StatusCodes} from "../enums/status-codes";
import {applicationService} from "../services/application.service";
import {ITokenPayload} from "../interfaces/token.interface";

class ApplicationController {
    public async GetAllApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
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

            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;

            const data = await applicationService.setManager(id as string, userId);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const applicationDto = req.body as ApplicationDto;

            const data = await applicationService.updateApplicationById(id as string, applicationDto);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async ExportApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const filters = res.locals.query as ApplicationFilters;

            const file = await applicationService.generateTable(filters);

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            res.setHeader(
                "Content-Disposition",
                'attachment; filename="applications.xlsx"'
            );

            res.status(StatusCodes.OK).send(file);
        } catch (error) {
            next(error);
        }
    }
}

export const applicationController = new ApplicationController();
