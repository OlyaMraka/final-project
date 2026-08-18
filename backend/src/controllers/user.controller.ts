import {Request, Response, NextFunction} from "express";
import {userService} from "../services/user.service";
import {StatusCodes} from "../enums/status-codes";
import {CreateUserDto, UpdateUserDto} from "../dtos/user.dto";

class UserController {
    public async GetAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    };

    public async GetUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as CreateUserDto;
            const data = await userService.create(user);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.deleteById(id as string);
            res.sendStatus(StatusCodes.NO_CONTENT);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.body as UpdateUserDto;
            const data = await userService.updateById(id as string, user);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async BanUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.banUserById(id as string);
            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async UnbanUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.unbanUserById(id as string);
            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async ActivateUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.activateUserById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
