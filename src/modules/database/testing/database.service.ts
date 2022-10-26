import { connection, isValidObjectId, Types } from 'mongoose'

import { ConfigService } from '@config'

import { DatabaseService as CoreDatabaseService } from '../database.service'

export class DatabaseService extends CoreDatabaseService {
    public static generateId(value?: string): Types.ObjectId {
        return typeof value === 'string' && isValidObjectId(value)
            ? new Types.ObjectId(value)
            : new Types.ObjectId()
    }

    public static async clearCollections(): Promise<void> {
        if (ConfigService.get('NODE_ENV') !== 'test') {
            return
        }

        const collections = connection.collections

        for (const key in collections) {
            await collections[key].deleteMany({})
        }
    }
}
