import joi from "joi";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static name = joi.string().min(3).max(20).trim();
    private static surname = joi.string().min(3).max(20).trim();

    public static validateUser = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        email: this.email.required(),
    });
}