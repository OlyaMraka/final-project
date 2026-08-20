import joi from "joi";

export class ApplicationCommentValidator {
    private static text = joi.string().trim().min(2).max(200);
    private static applicationId = joi.string().trim();

    public static validateCreateCommentBody = joi.object({
        text: this.text.required(),
        applicationId: this.applicationId.required(),
    });

    public static validateUpdateCommentBody = joi.object({
        text: this.text.required(),
    });
}