import mongoose from 'mongoose'

import { ConfigService } from '@config'
import { Logger } from '@logger'

export class DatabaseService {
    public static async connect(): Promise<void> {
        const connectionString = this.getConnectionString()

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

    private static getConnectionString(): string {
        const dbUri = ConfigService.get('MONGO_URI')

        if (!dbUri) {
            throw new Error('Database URI must be provided.')
        }

        const dbName = ConfigService.get('MONGO_DATABASE')

        if (!dbName) {
            throw new Error('Database name must be provided.')
        }

        return `${dbUri}/${dbName}`
    }
}
