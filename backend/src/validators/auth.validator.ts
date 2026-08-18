import joi from "joi";
import {UserValidation} from "../enums/validation.enum";

export class AuthValidator {
    private static refresh_token = joi.string().trim();
    private static activationToken = joi.string().trim();
    private static password = joi.string().regex(UserValidation.VALIDATE_PASSWORD);


    public static refresh = joi.object({
        refresh_token: this.refresh_token.required(),
    });

    public static setPassword = joi.object({
        activationToken: this.activationToken.required(),
        password: this.password.required()
    })
}
