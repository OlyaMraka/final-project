import {OpenAPIV3} from "openapi-types";
import {badRequestResponse, unauthorizedResponse} from "./responses/error.responses";

export const groupPaths: OpenAPIV3.PathsObject = {
    "/groups": {
        get: {
            tags: ["Groups"],
            summary: "Get all groups",
            security: [{bearerAuth: []}],
            responses: {
                "200": {
                    description: "Groups successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Group"
                                }
                            }
                        }
                    }
                },
                "401": unauthorizedResponse
            }
        },
        post: {
            tags: ["Groups"],
            summary: "Create group",
            security: [{bearerAuth: []}],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                            },
                            required: [ "name" ]
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Group successfully created.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Group"
                            }
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse,
            }
        }
    },

    "/groups/{id}": {
        put: {
            tags: ["Groups"],
            summary: "Update group information",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the group to update.",
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
                            },
                            required: [ "name" ]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Group successfully updated.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Group"
                            }
                        }
                    }
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse,
            }
        },
        get: {
            tags: ["Groups"],
            summary: "Get group by ID",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the group to retrieve.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "200": {
                    description: "Group successfully retrieved.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Group"
                            }
                        }
                    }
                },
                "401": unauthorizedResponse
            }
        },
        delete: {
            tags: ["Groups"],
            summary: "Delete group by ID",
            security: [{bearerAuth: []}],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the group to delete.",
                    schema: {type: "string"},
                }
            ],
            responses: {
                "204": {
                    description: "Successfully deleted group."
                },
                "401": unauthorizedResponse,
                "400": badRequestResponse
            }
        }
    }
}