import joi from "joi";

export class TariffValidator {
    private static name = joi.string().min(3).max(20).trim();

    public static validateTariff = joi.object({
        name: this.name.required(),
    });
}
