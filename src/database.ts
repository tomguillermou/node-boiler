import mongoose from 'mongoose'

import { logger } from '@core'

const { MONGO_URI, MONGO_DATABASE } = process.env

export async function connectDatabase(): Promise<void> {
    const connectionString = `${MONGO_URI}/${MONGO_DATABASE}`

    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })

    logger.info('Connected to database')
}
