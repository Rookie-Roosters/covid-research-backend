export const API_RESOURCES = {
    AUTHENTICATION: 'authentication',
    BOOKMARKS: 'bookmarks',
    RESEARCHES: 'researches',
    RESEARCHES_RESOURCES: {
        PHASES: 'phases',
        RECRUITMENT_STATUSES: 'recruitment-statuses',
        SOURCE_REGISTERS: 'source-registers',
        STUDY_TYPES: 'study-types',
        TARGET_SIZE_GROUPS: 'target-size-groups',
        TARGET_SIZES: 'target-sizes',
    },
    SEARCHES: 'searches',
    USERS: 'users',
    HISTORIES: 'histories',
};

export const DEFAULT_API_PATHS = {
    BY_ID: ':id',
    USER: 'user',
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
        RESEARCH_BY_ID: `research/${DEFAULT_API_PATHS.BY_ID}`,
        USER: DEFAULT_API_PATHS.USER,
    },
    RESEARCHES: {
        BASE_PATH: `/${API_RESOURCES.RESEARCHES}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
        UPDATE_DB: '/update-db',
        PHASES: {
            BASE_PATH: `/${API_RESOURCES.RESEARCHES_RESOURCES.PHASES}`,
        },
        RECRUITMENT_STATUSES: {
            BASE_PATH: `/${API_RESOURCES.RESEARCHES_RESOURCES.RECRUITMENT_STATUSES}`,
        },
        SOURCE_REGISTERS: {
            BASE_PATH: `/${API_RESOURCES.RESEARCHES_RESOURCES.SOURCE_REGISTERS}`,
        },
        STUDY_TYPES: {
            BASE_PATH: `/${API_RESOURCES.RESEARCHES_RESOURCES.STUDY_TYPES}`,
        },
        TARGET_SIZE_GROUPS: {
            BASE_PATH: `/${API_RESOURCES.RESEARCHES_RESOURCES.TARGET_SIZE_GROUPS}`,
        },
        TARGET_SIZES: {
            BASE_PATH: `/${API_RESOURCES.RESEARCHES_RESOURCES.TARGET_SIZES}`,
        },
    },
    SEARCHES: {
        BASE_PATH: `/${API_RESOURCES.SEARCHES}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
    },
    USERS: {
        BASE_PATH: `/${API_RESOURCES.USERS}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
    },
    HISTORIES: {
        BASE_PATH: `/${API_RESOURCES.HISTORIES}`,
        BY_ID: DEFAULT_API_PATHS.BY_ID,
        USER: DEFAULT_API_PATHS.USER,
    },
};
