import {NextFunction, Request, Response} from "express";
import {courseTariffService} from "../services/courseTariff.service";
import {StatusCodes} from "../enums/status-codes";
import {CourseTariffDto} from "../dtos/courseTariff.dto";

class CourseTariffController {
    public async GetAllCourseTariffs(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await courseTariffService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetCourseTariffById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await courseTariffService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateCourseTariff(req: Request, res: Response, next: NextFunction) {
        try {
            const courseTariffDto = req.body as CourseTariffDto;
            const data = await courseTariffService.create(courseTariffDto);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateCourseTariffById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const courseTariffDto = req.body as CourseTariffDto;
            const data = await courseTariffService.updateById(id as string, courseTariffDto);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteCourseTariffById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            await courseTariffService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
}

export const courseTariffController = new CourseTariffController();
