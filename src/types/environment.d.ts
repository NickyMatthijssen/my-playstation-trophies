declare let process: {
    env: {
        NPSSO: string|undefined;
        IMAGES_UNOPTIMIZED: boolean|undefined;
        MONGO_DB_CONNECTION_STRING: string|undefined;
        REDIS_HOST: string|undefined;
        REDIS_PORT: number|undefined;
        REDIS_USERNAME: string|undefined;
        REDIS_PASSWORD: string|undefined;
    };
};