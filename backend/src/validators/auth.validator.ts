import joi from "joi";
import {UserValidation} from "../enums/validation.enum";

export class AuthValidator {
    private static refresh_token = joi.string().trim();
    private static activationToken = joi.string().trim();
    private static password = joi.string();
    private static email = joi.string().email().trim();

    public static refresh = joi.object({
        refresh_token: this.refresh_token.required(),
    });

    public static setPassword = joi.object({
        activationToken: this.activationToken.required(),
        password: this.password.required().regex(UserValidation.VALIDATE_PASSWORD),
    });

    public static signIn = joi.object({
        email: this.email.required(),
        password: this.password.required()
    });
}
