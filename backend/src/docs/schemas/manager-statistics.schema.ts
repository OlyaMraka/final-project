import { OpenAPIV3 } from "openapi-types";

export const managerStatisticsSchema: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        total: {
            type: "integer",
        },
        statusStatistics: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    status: { type: "string" },
                    applicationCount: { type: "integer" },
                },
            },
        },
    },
};
