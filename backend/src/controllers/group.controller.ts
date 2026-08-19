import {NextFunction, Request, Response} from "express";
import {groupService} from "../services/group.service";
import {StatusCodes} from "../enums/status-codes";
import {GroupDto} from "../dtos/group.dto";

class GroupController {
    public async GetAllGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await groupService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetGroupById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await groupService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetGroupsByCourseTariffId(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await groupService.getByCourseTariffId(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const groupDto = req.body as GroupDto;
            const data = await groupService.create(groupDto);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const groupDto = req.body as GroupDto;
            const data = await groupService.updateById(id as string, groupDto);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            await groupService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
}

export const groupController = new GroupController();
