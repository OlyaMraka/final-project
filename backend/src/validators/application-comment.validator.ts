import joi from "joi";

export class ApplicationCommentValidator {
    private static text = joi.string().trim().min(2).max(200);
    private static applicationId = joi.string().trim().hex().length(24).messages({
        "string.hex": "Application ID must be a valid MongoDB ID.",
        "string.length": "Application ID must be a valid MongoDB ID.",
    });

    public static validateCreateCommentBody = joi.object({
        text: this.text.required(),
        applicationId: this.applicationId.required(),
    });

    public static validateUpdateCommentBody = joi.object({
        text: this.text.required(),
    });
}
