import joi from "joi";

export class GroupValidator {
    private static name = joi.string().min(3).max(30).trim();

    public static validateGroup = joi.object({
        name: this.name.required()
    });
}
