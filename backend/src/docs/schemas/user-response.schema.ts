import { OpenAPIV3 } from "openapi-types";

export const userSchema: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            example: "6a92e7aed3670af415ba36e2",
        },
        name: {
            type: "string",
            example: "Olena UPDATED",
        },
        surname: {
            type: "string",
            example: "Mraka UPDATED",
        },
        email: {
            type: "string",
            format: "email",
            example: "olgamrako@gmail.com",
        },
        role: {
            type: "string",
            example: "manager",
        },
        banned: {
            type: "boolean",
            example: true,
        },
        deleted: {
            type: "boolean",
            example: false,
        },
        isActive: {
            type: "boolean",
            example: false,
        },
    },
};
