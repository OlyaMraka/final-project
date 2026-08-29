import {OpenAPIV3} from "openapi-types";
import {CourseName} from "../../enums/course-name.enum";
import {CourseFormat} from "../../enums/course-format.enum";
import {TariffName} from "../../enums/tariff-name.enum";
import {ApplicationStatus} from "../../enums/application-status.enum";

export const applicationSchema: OpenAPIV3.SchemaObject = {
    type: "object",

    properties: {
        _id: {
            type: "string",
            example: "6a8b79ddd777312ba1ade495",
        },

        name: {
            type: "string",
            example: "Oleg",
        },

        surname: {
            type: "string",
            example: "Ivanov",
        },

        email: {
            type: "string",
            format: "email",
            example: "olegivanov@gmail.com",
        },

        age: {
            type: "integer",
            example: 45,
        },

        phone: {
            type: "string",
            example: "+380987062624",
        },

        course: {
            type: "string",
            enum: Object.values(CourseName),
            example: CourseName.QACX,
        },

        format: {
            type: "string",
            enum: Object.values(CourseFormat),
            example: CourseFormat.ONLINE,
        },

        tariff: {
            type: "string",
            enum: Object.values(TariffName),
            example: TariffName.MINIMAL,
        },

        status: {
            type: "string",
            enum: Object.values(ApplicationStatus),
            example: ApplicationStatus.NEW,
        },

        groupId: {
            type: "string",
            example: "6a86bf362cbffb6d1634b100",
        },

        alreadyPaid: {
            type: "number",
            example: 500,
        },

        sum: {
            type: "number",
            example: 2000,
        },

        managerId: {
            type: "string",
            example: "6a86cde35710c1460311848b",
        },

        message: {
            type: "string",
            example: "test",
        },

        utm: {
            type: "string",
            example: "test",
        },

        createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-23T22:53:18.151Z",
        },

        updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-27T21:30:09.832Z",
        },
    },
};
