import 'module-alias/register'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import { logger } from '@core'

import { createExpressApp } from './app'
import { connectDatabase } from './database'
import { createHttpServer } from './server'

async function main(): Promise<void> {
    try {
        await connectDatabase()

        const app = createExpressApp()
        createHttpServer(app)
    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
}

main()
