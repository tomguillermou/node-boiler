/** File to load secrets from */
export const ENV_FILE = '.env';

/** Secrets to load from the environment file */
export const SECRETS = [
    'ENVIRONMENT',
    'PORT',
    'MONGO_URI',
    'MONGO_DATABASE',
    'JWT_SECRET',
    'SALT_ROUNDS',
];
