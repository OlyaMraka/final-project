import { OpenAPIV3 } from "openapi-types";

export const badRequestResponse: OpenAPIV3.ResponseObject = {
    description: "Bad request",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    status: { type: "integer", default: 400 },
                    message: { type: "string" },
                },
            },
        },
    },
};

export const unauthorizedResponse: OpenAPIV3.ResponseObject = {
    description: "Unauthorized",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    status: { type: "integer", default: 401 },
                    message: { type: "string" },
                },
            },
        },
    },
};

export const forbiddenResponse: OpenAPIV3.ResponseObject = {
    description: "Unauthorized",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    status: { type: "integer", default: 403 },
                    message: { type: "string" },
                },
            },
        },
    },
};
