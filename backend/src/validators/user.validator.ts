import joi from "joi";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static name = joi.string().min(3).max(20).trim();
    private static surname = joi.string().min(3).max(20).trim();
    private static page = joi.number().integer().min(1);

    public static validateUser = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        email: this.email.required(),
    });

    public static validateFilters = joi.object({
        page: this.page.default(1)
    })
}