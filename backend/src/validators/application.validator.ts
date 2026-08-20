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
    private static name = joi.string().trim().min(2).max(50);
    private static surname = joi.string().trim().min(2).max(50);
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
    private static managerId = joi.string().trim();

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

    public static validateSetManager = joi.object({
        managerId: this.managerId.required(),
    });
}
