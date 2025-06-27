declare let process: {
    env: {
        NPSSO: string|undefined;
        API_KEY: string|undefined;
        API_ROUTES_ENABLED: string|undefined;
        MONGO_DB_CONNECTION_STRING: string|undefined;
        REDIS_HOST: string|undefined;
        REDIS_PORT: number|undefined;
        REDIS_USERNAME: string|undefined;
        REDIS_PASSWORD: string|undefined;
    };
};