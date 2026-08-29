import {OpenAPIV3} from "openapi-types";
import {
    badRequestResponse,
    unauthorizedResponse,
} from "./responses/error.responses";

export const authPaths: OpenAPIV3.PathsObject = {
    "/auth/sign-in": {
        post: {
            tags: ["Auth"],
            summary: "Sign in into account.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", format: "email" },
                                password: { type: "string", format: "password" }
                            },
                            required: [ "email", "password" ]
                        }
                    }
                }
            },
            responses: {
                "200" : {
                    description: "Authentication successful",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            _id: { type: "string"},
                                            name: { type: "string"},
                                            surname: { type: "string"},
                                            email: { type: "string"},
                                            role: { type: "string"},
                                            banned: { type: "boolean"},
                                            deleted: { type: "boolean"},
                                            isActive: { type: "boolean"},
                                            lastLogin: { type: "string"},
                                        }
                                    },
                                    token: {
                                        type: "object",
                                        properties: {
                                            access_token: {type: "string"},
                                            refresh_token: {type: "string"},
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "401": unauthorizedResponse
            }
        }
    },
    "/auth/refresh": {
        post: {
            tags: ["Auth"],
            summary: "Refresh token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refresh_token: { type: "string" }
                            },
                            required: [ "refresh_token" ]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Refresh token successful",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    access_token: { type: "string"},
                                    refresh_token: { type: "string"}
                                }
                            }
                        }
                    }
                },
                "401": unauthorizedResponse
            }
        }
    },
    "/auth/me": {
        get: {
            tags: ["Auth"],
            summary: "Get current user",
            security: [{bearerAuth: []}],
            responses: {
                "200": {
                    description: "Successfully retrieved current user information.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    _id: { type: "string" },
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    email: { type: "string" },
                                    role: { type: "string" },
                                    banned: { type: "boolean" },
                                    deleted: { type: "boolean" },
                                    isActive: { type: "boolean" },
                                    lastLogin: { type: "string" }
                                }
                            }
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        }
    },
    "/auth/log-out": {
        post: {
            tags: ["Auth"],
            summary: "Log out current user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refresh_token: { type: "string" }
                            },
                            required: [ "refresh_token" ]
                        }
                    }
                }
            },
            responses: {
                "204": {
                    description: "Successfully logged out",
                }
            }
        }
    },
    "/auth/set-password": {
        patch: {
            tags: ["Auth"],
            summary: "Set user password",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                activationToken: { type: "string" },
                                password: { type: "string" }
                            },
                            required: [ "activationToken", "password" ]
                        }
                    }
                }
            },
            responses: {
                "204": {
                    description: "Successfully set password"
                }
            }
        }
    },
};
