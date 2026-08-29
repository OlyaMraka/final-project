import {OpenAPIV3} from "openapi-types";

export const groupSchema: OpenAPIV3.SchemaObject = {
    type: "object",

    properties: {
        _id: {
            type: "string",
            example: "6a86bf362cbffb6d1634b100",
        },

        name: {
            type: "string",
            example: "Group 14",
        },

        deleted: {
            type: "boolean",
            example: false,
        },

        createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-20T08:47:50.100Z",
        },

        updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-20T08:47:50.100Z",
        },

        deletedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: null,
        },
    },
};
