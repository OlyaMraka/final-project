import {OpenAPIV3} from "openapi-types";
import {
    badRequestResponse,
    unauthorizedResponse,
} from "./responses/error.responses";

export const userPaths: OpenAPIV3.PathsObject = {
    "/users": {
        post: {
            tags: ["Users"],
            summary: "Create a new manager",
            security: [{bearerAuth: []}],
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
                            },
                            required: [ "name", "surname", "email" ]
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Manager successfully created.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            },
        },
        get: {
            tags: ["Users"],
            summary: "Get all users",
            security: [{bearerAuth: []}],
            responses: {
                "200": {
                    description: "Users successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        }
                    }
                },
                "401": unauthorizedResponse
            }
        }
    },

    "/users/{id}": {
        put: {
            tags: ["Users"],
            summary: "Update user information",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the user to update.",
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
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Manager successfully updated.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            },
        },
        delete: {
            tags: ["Users"],
            summary: "Delete user by ID",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the user to delete.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "204": {
                    description: "Successfully deleted user."
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        },
        get: {
            tags: ["Users"],
            summary: "Get User by ID",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the user to get.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Manager successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        }
    },

    "/users/{id}/ban": {
        patch: {
            tags: ["Users"],
            summary: "Ban user",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the user to ban.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Manager successfully banned.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            },
        }
    },

    "/users/{id}/unban": {
        patch: {
            tags: ["Users"],
            summary: "Unban user",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the user to unban.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Manager successfully unbanned.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            },
        }
    },

    "/users/{id}/activate": {
        patch: {
            tags: ["Users"],
            summary: "Activate user",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the user to activate.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Manager successfully activated.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            },
        }
    },

    "/users/manages": {
        get: {
            tags: ["Users"],
            summary: "Get all managers",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    required: true,
                    description: "Page number to retrieve.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Managers successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ManagersResponse",
                            },
                        },
                    },
                },
                "401": unauthorizedResponse
            }
        }
    }
}
