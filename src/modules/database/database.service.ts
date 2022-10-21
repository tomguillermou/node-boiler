import mongoose from 'mongoose'

import { Logger } from '@logger'

const { MONGO_URI, MONGO_DATABASE } = process.env

export class DatabaseService {
    public static async connect(): Promise<void> {
        const connectionString = `${MONGO_URI}/${MONGO_DATABASE}`

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        Logger.info('Database: connected')
    }

    public static async disconnect(): Promise<void> {
        await mongoose.disconnect()

        Logger.info('Database: disconnected')
    }
}
