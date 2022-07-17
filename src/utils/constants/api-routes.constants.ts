export const API_RESOURCES = {
    AUTHENTICATION: 'authentication',
    BOOKMARKS: 'bookmarks',
    RESEARCHES: 'researches',
    SEARCHES: 'searches',
    USERS: 'users',
};

export const DEFAULT_API_PATHS = {
    BY_ID: ':id',
};

export const API_ENDPOINTS = {
    AUTHENTICATION: {
        BASE_PATH: `/${API_RESOURCES.AUTHENTICATION}`,
        SIGN_UP: 'sign-up',
        LOG_IN: 'log-in',
    },
    BOOKMARKS: {
        BASE_PATH: `/${API_RESOURCES.BOOKMARKS}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
    },
    RESEARCHES: {
        BASE_PATH: `/${API_RESOURCES.RESEARCHES}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
    },
    SEARCHES: {
        BASE_PATH: `/${API_RESOURCES.SEARCHES}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
    },
    USERS: {
        BASE_PATH: `/${API_RESOURCES.USERS}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
    },
};
