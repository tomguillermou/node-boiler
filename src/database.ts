import mongoose from 'mongoose';

import { MONGOOSE_CONNECTION_OPTIONS } from './config/configuration';

const { MONGO_URI, MONGO_DATABASE } = process.env;

/**
 * Connect to MongoDB database.
 */
export async function connectToMongoDB(): Promise<void> {
    const connectionString = `${MONGO_URI}/${MONGO_DATABASE}`;

    await mongoose.connect(connectionString, MONGOOSE_CONNECTION_OPTIONS);

    console.log(`[log] Connected to db: ${MONGO_DATABASE}`);
}
