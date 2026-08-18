import {Course} from "../models/course.model";
import {ICourse} from "../interfaces/course.interface";
import {CourseDto} from "../dtos/course.dto";

class CourseRepository {
    public getAll(): Promise<ICourse[]> {
        return Course.find();
    }

    public create(course: CourseDto): Promise<ICourse> {
        return Course.create(course);
    }

    public updateById(courseId: string, course: CourseDto): Promise<ICourse> {
        return Course.findByIdAndUpdate(courseId, course, { returnDocument: 'after' });
    }

    public deleteById(courseId: string): Promise<ICourse> {
        return Course.findByIdAndDelete(courseId);
    }
}

export const courseRepository = new CourseRepository();
