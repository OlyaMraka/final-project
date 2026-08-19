import {NextFunction, Request, Response} from "express";
import {LeadFilters} from "../dtos/lead.dto";
import {StatusCodes} from "../enums/status-codes";
import {leadService} from "../services/lead.service";

class LeadController {
    public async getAllLeads(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await leadService.getAll(res.locals.query as LeadFilters);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const leadController = new LeadController();
