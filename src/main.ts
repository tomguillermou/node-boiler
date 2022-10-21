import 'module-alias/register'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import { logger } from './logger'

import { api } from './api'
import { connectDatabase } from './database'
import { createHttpServer } from './server'

async function bootstrap(): Promise<void> {
    try {
        await connectDatabase()

        createHttpServer(api)
    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
}

bootstrap()
