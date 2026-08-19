import {ICourse} from "../interfaces/course.interface";
import {courseRepository} from "../repositories/course.repository";
import {CourseDto} from "../dtos/course.dto";

class CourseService {
    public getAll(): Promise<ICourse[]> {
        return courseRepository.getAll();
    }

    public async getById(courseId: string): Promise<ICourse> {
        return courseRepository.getById(courseId);
    }

    public create(course: CourseDto): Promise<ICourse> {
        return courseRepository.create(course);
    }

    public updateById(courseId: string, course: CourseDto): Promise<ICourse> {
        return courseRepository.updateById(courseId, course);
    }

    public deleteById(courseId: string): Promise<ICourse> {
        return courseRepository.deleteById(courseId);
    }
}

export const courseService = new CourseService();
