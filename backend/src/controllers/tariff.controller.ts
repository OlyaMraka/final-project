import {NextFunction, Request, Response} from "express";
import {tariffService} from "../services/tariff.service";
import {StatusCodes} from "../enums/status-codes";
import {TariffDto} from "../dtos/tariff.dto";

class TariffController {
    public async GetAllTariffs(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await tariffService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetTariffById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await tariffService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateTariff(req: Request, res: Response, next: NextFunction) {
        try {
            const tariffDto = req.body as TariffDto;
            const tariff = await tariffService.create(tariffDto);
            res.status(StatusCodes.CREATED).json(tariff);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateTariff(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const tariffDto = req.body as TariffDto;
            const tariff = await tariffService.updateById(id as string, tariffDto);
            res.status(StatusCodes.OK).json(tariff);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteTariff(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await tariffService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
}

export const tariffController = new TariffController();
