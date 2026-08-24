import joi from "joi";
import {CourseName} from "../enums/course-name.enum";
import {CourseFormat} from "../enums/course-format.enum";
import {TariffName} from "../enums/tariff-name.enum";
import {ApplicationStatus} from "../enums/application-status.enum";
import {OrderDirection, SortField} from "../enums/sort-field.enum";

export class ApplicationValidator {
    private static page = joi.number().integer().min(1);
    private static sortOrder = joi.string().valid(...Object.values(OrderDirection));
    private static sortField = joi.string().valid(...Object.values(SortField));
    private static name = joi.string().trim();
    private static surname = joi.string().trim();
    private static email = joi.string().trim().email();
    private static age = joi.number().integer().min(0);
    private static phone = joi.string().trim();
    private static course = joi.string().valid(...Object.values(CourseName));
    private static tariff = joi.string().valid(...Object.values(TariffName));
    private static format = joi.string().valid(...Object.values(CourseFormat));
    private static groupId = joi.string().trim();
    private static status = joi.string().valid(...Object.values(ApplicationStatus));
    private static startDate = joi.date();
    private static endDate = joi.date().min(joi.ref("startDate"));
    private static sum = joi.number().integer().min(1);
    private static alreadyPaid = joi.number().integer().min(1);

    public static validateFilters = joi.object({
        page: this.page.default(1),

        sortOrder: this.sortOrder,
        sortField: this.sortField,

        name: this.name,
        surname: this.surname,
        email: this.email,
        age: this.age,
        phone: this.phone,

        course: this.course,
        tariff: this.tariff,
        format: this.format,
        groupId: this.groupId,
        status: this.status,

        startDate: this.startDate,
        endDate: this.endDate,
    });

    public static validateApplicationUpdate = joi.object({
        name: this.name.min(2).max(50).required(),
        surname: this.surname.min(2).max(50).required(),
        email: this.email.required(),
        age: this.age.required(),
        phone: this.phone.required(),
        course: this.course.required(),
        tariff: this.tariff.required(),
        format: this.format.required(),
        groupId: this.groupId.required(),
        status: this.status.required(),
        sum: this.sum.required(),
        alreadyPaid: this.alreadyPaid.required()
    });
}
