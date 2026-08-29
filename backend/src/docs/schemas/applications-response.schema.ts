import {OpenAPIV3} from "openapi-types";

export const applicationsResponseSchema: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        applications: {
            type: "array",
            items: {
                $ref: "#/components/schemas/ApplicationResponse",
            },
        },
        total: {
            type: "integer",
            example: 500,
        },
        page: {
            type: "integer",
            example: 1,
        },
        limit: {
            type: "integer",
            example: 25,
        },
        pagesCount: {
            type: "integer",
            example: 20,
        },
    },
    required: [
        "applications",
        "total",
        "page",
        "limit",
        "pagesCount",
    ],
};
