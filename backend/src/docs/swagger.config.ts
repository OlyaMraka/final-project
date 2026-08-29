import {OpenAPIV3} from "openapi-types";
import swaggerUI from "swagger-ui-express"
import {authPaths} from "./auth.swagger";
import {userPaths} from "./user.swagger";
import {userSchema} from "./schemas/user-response.schema";
import {managerStatisticsSchema} from "./schemas/manager-statistics.schema";
import {managersResponseSchema} from "./schemas/managers-response.schema";
import {applicationResponseSchema} from "./schemas/applicationResponseSchema";
import {applicationsResponseSchema} from "./schemas/applications-response.schema";
import {applicationSchema} from "./schemas/application.schema";
import {applicationPaths} from "./application.swagger";
import {commentSchema} from "./schemas/comment.schema";
import {applicationCommentPaths} from "./application-comment.swagger";
import {groupSchema} from "./schemas/group.schema";
import {groupPaths} from "./group.swagger";
import {config} from "../configs/config";

const SwaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Crm System",
        version: "1.0.0",
        description: "CRM system for managing applications, managers, groups, and customer interactions."
    },
    servers: [
        {
            url: "http://localhost:7000",
            description: "Local server",
        },
        {
            url: config.BACKEND_API_URL,
            description: "Production server",
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints"
        },
        {
            name: "Applications",
            description: "Application endpoints"
        },
        {
            name: "Application comments",
            description: "Application comment endpoints"
        },
        {
            name: "Groups",
            description: "Group endpoints"
        },
        {
            name: "Users",
            description: "User endpoints"
        },
    ],
    paths: {
        ...authPaths,
        ...userPaths,
        ...applicationPaths,
        ...applicationCommentPaths,
        ...groupPaths
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        },

        schemas: {
            User: userSchema,
            ManagerStatistics: managerStatisticsSchema,
            ManagersResponse: managersResponseSchema,
            ApplicationResponse: applicationResponseSchema,
            ApplicationsResponse: applicationsResponseSchema,
            Application: applicationSchema,
            Comment: commentSchema,
            Group: groupSchema,
        },
    }
}

export {SwaggerDocument, swaggerUI}
