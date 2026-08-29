import { OpenAPIV3 } from "openapi-types";

export const managersResponseSchema: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        managers: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    manager: {
                        $ref: "#/components/schemas/User",
                    },
                    statistics: {
                        $ref: "#/components/schemas/ManagerStatistics",
                    },
                },
            },
        },
        total: { type: "integer" },
        limit: { type: "integer" },
        page: { type: "integer" },
        pageCount: { type: "integer" },
    },
};
