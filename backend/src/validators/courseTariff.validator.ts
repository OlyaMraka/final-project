import joi from "joi";

export class CourseTariffValidator {
    private static price = joi.number();
    private static courseId = joi.string().trim();
    private static tariffId = joi.string().trim();
    private static courseFormat = joi.string().trim();

    public static validateCourseTariff = joi.object({
        price: this.price.required(),
        courseId: this.courseId.required(),
        tariffId: this.tariffId.required(),
        courseFormat: this.courseFormat.required(),
    });
}
