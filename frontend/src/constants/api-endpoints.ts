export const API_ENDPOINTS = {
    AUTH: {
        SIGN_IN: "/auth/sign-in",
        LOG_OUT: "/auth/log-out",
        ME: "/auth/me",
        REFRESH: "/auth/refresh",
        SET_PASSWORD: "/auth/set-password",
    },

    APPLICATIONS: {
        BASE: "/applications",
        EXPORT: "/applications/export",
        STATISTICS: "/applications/application-statistics",

        SET_MANAGER: (applicationId: string) =>
            `/applications/set-manager/${applicationId}`,

        BY_ID: (applicationId: string) =>
            `/applications/${applicationId}`,
    },

    APPLICATION_COMMENTS: {
        BASE: "/application-comments",

        BY_ID: (commentId: string) =>
            `/application-comments/${commentId}`,

        BY_APPLICATION_ID: (applicationId: string) =>
            `/application-comments/application/${applicationId}`,
    },

    GROUPS: {
        BASE: "/groups",
    },

    USERS: {
        BASE: "/users",
        MANAGERS: (page: number) => `/users/managers?page=${page}`,
        BAN: (managerId: string) => `/users/${managerId}/ban`,
        UNBAN: (managerId: string) => `/users/${managerId}/unban`,
        ACTIVATE: (managerId: string) => `/users/${managerId}/activate`,
        RECOVER_PASSWORD: (managerId: string) =>
            `/users/${managerId}/resover-password`,
    },
} as const;
