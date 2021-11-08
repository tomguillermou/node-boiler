import mongoose from 'mongoose';

import { logger } from '@core/logger';

import { CONNECTION_OPTIONS } from '@config/database';

const { MONGO_URI, MONGO_DATABASE } = process.env;

/**
 * Connect to MongoDB database.
 */
export async function connectMongo(): Promise<void> {
    const connectionString = `${MONGO_URI}/${MONGO_DATABASE}`;

    await mongoose.connect(connectionString, CONNECTION_OPTIONS);

    logger.info('Connected to database');
}
