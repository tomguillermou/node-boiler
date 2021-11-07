import dotenv from 'dotenv';
import fs from 'fs';

import { ENV_FILE, SECRETS } from './config/secrets';

/**
 * Load secrets from the environment file.
 */
function load(): void {
    if (!fs.existsSync(ENV_FILE)) {
        console.error(`Environment file does not exists: ${ENV_FILE}`);
        process.exit(1);
    }

    dotenv.config({ path: ENV_FILE });

    const missingSecrets = SECRETS.filter((secret) => typeof process.env[secret] === 'undefined');

    if (missingSecrets.length) {
        missingSecrets.forEach((secret) => console.error(`Missing secret: ${secret}`));
        process.exit(1);
    }

    console.log('Secrets loaded');
}

load();
