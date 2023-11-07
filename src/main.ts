import 'reflect-metadata'

import { createApp } from '@api'
import { Database } from '@utils'

import { createHttpServer } from './server'

async function bootstrap(): Promise<void> {
  try {
    await Database.connectToDatabase()
    createHttpServer(createApp())
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

bootstrap()
