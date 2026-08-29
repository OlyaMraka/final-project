import {OpenAPIV3} from "openapi-types";
import {OrderDirection, SortField} from "../enums/sort-field.enum";
import {CourseName} from "../enums/course-name.enum";
import {CourseFormat} from "../enums/course-format.enum";
import {TariffName} from "../enums/tariff-name.enum";
import {ApplicationStatus} from "../enums/application-status.enum";
import {badRequestResponse, unauthorizedResponse} from "./responses/error.responses";

export const applicationPaths: OpenAPIV3.PathsObject = {
    "/applications": {
        get: {
            tags: ["Applications"],
            summary: "Get applications",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    required: false,
                    description: "The page number to retrieve.",
                    schema: {
                        type: "integer",
                        minimum: 1,
                        default: 1,
                    },
                },
                {
                    name: "sortOrder",
                    in: "query",
                    required: false,
                    description: "The order in which applications are sorted.",
                    schema: {
                        type: "string",
                        enum: Object.values(OrderDirection),
                    },
                },
                {
                    name: "sortField",
                    in: "query",
                    required: false,
                    description: "The field by which applications are sorted.",
                    schema: {
                        type: "string",
                        enum: Object.values(SortField),
                    },
                },
                {
                    name: "name",
                    in: "query",
                    required: false,
                    description: "Filter applications by applicant name.",
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "surname",
                    in: "query",
                    required: false,
                    description: "Filter applications by applicant surname.",
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "email",
                    in: "query",
                    required: false,
                    description: "Filter applications by email.",
                    schema: {
                        type: "string",
                        format: "email",
                    },
                },
                {
                    name: "age",
                    in: "query",
                    required: false,
                    description: "Filter applications by age.",
                    schema: {
                        type: "integer",
                        minimum: 0
                    },
                },
                {
                    name: "phone",
                    in: "query",
                    required: false,
                    description: "Filter applications by phone number.",
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "course",
                    in: "query",
                    required: false,
                    description: "Filter applications by course.",
                    schema: {
                        type: "string",
                        enum: Object.values(CourseName),
                    },
                },
                {
                    name: "tariff",
                    in: "query",
                    required: false,
                    description: "Filter applications by tariff.",
                    schema: {
                        type: "string",
                        enum: Object.values(TariffName),
                    },
                },
                {
                    name: "format",
                    in: "query",
                    required: false,
                    description: "Filter applications by course format.",
                    schema: {
                        type: "string",
                        enum: Object.values(CourseFormat),
                    },
                },
                {
                    name: "groupId",
                    in: "query",
                    required: false,
                    description: "Filter applications by group ID.",
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "status",
                    in: "query",
                    required: false,
                    description: "Filter applications by status.",
                    schema: {
                        type: "string",
                        enum: Object.values(ApplicationStatus),
                    },
                },
                {
                    name: "startDate",
                    in: "query",
                    required: false,
                    description: "Filter applications from this date.",
                    schema: {
                        type: "string",
                        format: "date-time",
                    },
                },
                {
                    name: "endDate",
                    in: "query",
                    required: false,
                    description: "Filter applications up to this date.",
                    schema: {
                        type: "string",
                        format: "date-time",
                    },
                },
                {
                    name: "myApplications",
                    in: "query",
                    required: false,
                    description: "Return only applications assigned to the current user.",
                    schema: {
                        type: "boolean",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Applications successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ApplicationsResponse",
                            },
                        },
                    },
                },
                "401": unauthorizedResponse
            },
        },
    },

    "/applications/set-manager/{id}": {
        post: {
            tags: ["Applications"],
            summary: "Set manager to application",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the application to set manager.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Manager successfully assigned to application.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Application",
                            },
                        },
                    },
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        }
    },

    "/applications/{id}": {
        put: {
            tags: ["Applications"],
            summary: "Update applications",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the application to update.",
                    schema: {type: "string"},
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                surname: { type: "string" },
                                email: { type: "string" },
                                age: { type: "integer", minimum: 0 },
                                phone: { type: "string" },
                                course: {
                                    type: "string",
                                    enum: Object.values(CourseName)
                                },

                                format: {
                                    type: "string",
                                    enum: Object.values(CourseFormat)
                                },

                                tariff: {
                                    type: "string",
                                    enum: Object.values(TariffName)
                                },

                                status: {
                                    type: "string",
                                    enum: Object.values(ApplicationStatus)
                                },

                                groupId: { type: "string" },
                                alreadyPaid: { type: "number", minimum: 0 },
                                sum: { type: "number", minimum: 0 },
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Application successfully updated.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ApplicationResponse",
                            },
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        }
    },

    "/applications/application-statistics": {
        get: {
            tags: ["Applications"],
            summary: "Get applications statistics",
            security: [{ bearerAuth: [] }],
            responses: {
                "200": {
                    description: "Application Statistics successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    total: { type: "number" },
                                    statusStatistics: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                status: { type: "string" },
                                                applicationCount: { type: "number" },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        }
    }
}
