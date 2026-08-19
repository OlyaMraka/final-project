import joi from "joi";

export class CourseValidator {
    private static name = joi.string().min(3).max(20).trim();

    public static validateCourse = joi.object({
        name: this.name.required(),
    });
}
