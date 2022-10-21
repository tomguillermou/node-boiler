import 'module-alias/register'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import { Logger } from '@logger'
import { DatabaseService } from '@database'

import { api } from './api'
import { createHttpServer } from './server'

async function bootstrap(): Promise<void> {
    try {
        await DatabaseService.connect()

        createHttpServer(api)
    } catch (error) {
        Logger.error(error)
        process.exit(1)
    }
}

bootstrap()
