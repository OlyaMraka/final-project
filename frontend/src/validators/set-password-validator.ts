import Joi from "joi";

const VALIDATE_PASSWORD =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export const SetPasswordValidator = Joi.object({
    password: Joi.string()
        .pattern(VALIDATE_PASSWORD)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base":
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
            "any.required": "Password is required",
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "string.empty": "Confirm password is required",
            "any.only": "Passwords do not match",
            "any.required": "Confirm password is required",
        }),
});

