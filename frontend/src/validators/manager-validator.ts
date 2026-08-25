import Joi from "joi";

export const ManagerValidator = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters long",
            "string.max": "Name must not exceed 20 characters",
            "any.required": "Name is required",
        }),

    surname: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.base": "Surname must be a string",
            "string.empty": "Surname is required",
            "string.min": "Surname must be at least 3 characters long",
            "string.max": "Surname must not exceed 20 characters",
            "any.required": "Surname is required",
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base": "Email must be a string",
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required",
        }),
});
