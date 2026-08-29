import {OpenAPIV3} from "openapi-types";

export const commentSchema: OpenAPIV3.SchemaObject = {
    type: "object",

    properties: {
        _id: {
            type: "string",
            example: "6a8b79ddd777312ba1ade495",
        },

        text: {
            type: "string",
            example: "Client asked to call back tomorrow.",
        },

        applicationId: {
            type: "string",
            example: "6a8b79ddd777312ba1ade4b4",
        },

        deleted: {
            type: "boolean",
            example: false,
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

        deletedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: null,
        },
    },
};
