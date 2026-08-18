import {NextFunction, Request, Response} from "express";
import {courseService} from "../services/course.service";
import {StatusCodes} from "../enums/status-codes";
import {CourseDto} from "../dtos/course.dto";

class CourseController {
    public async GetAllCourses(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await courseService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const courseDto = req.body as CourseDto;
            const course = await courseService.create(courseDto);
            res.status(StatusCodes.OK).json(course);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const courseDto = req.body as CourseDto;
            const course = await courseService.updateById(id as string, courseDto);
            res.status(StatusCodes.OK).json(course);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await courseService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
}

export const courseController = new CourseController();
