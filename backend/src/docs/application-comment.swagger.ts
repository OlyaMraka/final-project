import {OpenAPIV3} from "openapi-types";
import {badRequestResponse, unauthorizedResponse} from "./responses/error.responses";

export const applicationCommentPaths: OpenAPIV3.PathsObject = {
    "/application-comments": {
        post: {
            tags: ["Application comments"],
            summary: "Create a new application comment",
            security: [{bearerAuth: []}],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                text: { type: "string" },
                                applicationId: { type: "string" },
                            },
                            required: [ "text", "applicationId" ]
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Comment successfully created.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Comment",
                            },
                        },
                    },
                },

                "401": unauthorizedResponse,
                "400": badRequestResponse,
            }
        }
    },

    "/application-comments/{id}": {
        put: {
            tags: ["Application comments"],
            summary: "Update application comment",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the comment to update.",
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
                                text: { type: "string" },
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Comment successfully updated.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Comment",
                            },
                        },
                    },
                },

                "401": unauthorizedResponse,
                "400": badRequestResponse,
            }
        },
        delete: {
            tags: ["Application comments"],
            summary: "Delete application comment",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the comment to delete.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "204": {
                    description: "Successfully deleted comment."
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        }
    },

    "/application-comments/application/{id}": {
        get: {
            tags: ["Application comments"],
            summary: "Get application comments by application ID",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the application.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Application comments successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Comment",
                                }
                            }
                        }
                    }
                },
                "401": unauthorizedResponse
            }
        }
    }
};
