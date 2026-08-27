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

    private static name = joi.string().trim().max(50).allow("", null);
    private static surname = joi.string().trim().max(50).allow("", null);
    private static email = joi.string().trim().email().allow("", null);
    private static age = joi.number().integer().min(0).allow(null);
    private static phone = joi.string().trim().allow("", null);

    private static course = joi.string().valid(...Object.values(CourseName)).allow("", null);
    private static tariff = joi.string().valid(...Object.values(TariffName)).allow("", null);
    private static format = joi.string().valid(...Object.values(CourseFormat)).allow("", null);
    private static groupId = joi.string().trim().allow("", null);
    private static status = joi.string().valid(...Object.values(ApplicationStatus)).allow("", null);

    private static startDate = joi.date().allow(null);
    private static endDate = joi.date().min(joi.ref("startDate")).allow(null);

    private static sum = joi.number().integer().min(1).allow(null);
    private static alreadyPaid = joi.number().integer().min(0).allow(null);

    private static myApplications = joi.boolean();

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

        myApplications: this.myApplications,
    });

    public static validateApplicationUpdate = joi.object({
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
        sum: this.sum,
        alreadyPaid: this.alreadyPaid
    });
}
