/**
 * Secrets to load from the environment file.
 * Throws an error if any of them is missing from the `.env` file.
 */
export const SECRETS = [
    'NODE_ENV',
    'PORT',
    'MONGO_URI',
    'MONGO_DATABASE',
    'JWT_SECRET',
    'SALT_ROUNDS',
];
