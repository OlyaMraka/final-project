import {Course} from "../models/course.model";

class CourseSeeder {
    public async seed(): Promise<void> {
        const courses = ["FS", "QAX", "JCX", "JSCX", "FE", "PCX"].map((name) => ({name}));

        await Course.bulkWrite(
            courses.map((course) => ({
                updateOne: {
                    filter: course,
                    update: {$setOnInsert: course},
                    upsert: true,
                },
            }))
        );
    }
}

export const courseSeeder = new CourseSeeder();
