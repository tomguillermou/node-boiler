import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import { logger } from '@core/logger';

import { SECRETS } from '@config/secrets';

const ENV_FILE_PATH = path.join(process.cwd(), '.env');

/**
 * Load secrets from the environment file.
 */
function load(): void {
    if (!fs.existsSync(ENV_FILE_PATH)) {
        logger.error(`Environment file not found`);
        process.exit(1);
    }

    dotenv.config({ path: ENV_FILE_PATH });

    const missingSecrets = SECRETS.filter((secret) => typeof process.env[secret] === 'undefined');

    if (missingSecrets.length) {
        missingSecrets.forEach((secret) => logger.error(`Missing secret: ${secret}`));
        process.exit(1);
    }

    logger.info('Secrets loaded');
}

load();
