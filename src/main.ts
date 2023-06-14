import 'reflect-metadata'

import { createApp } from '@api'
import { connectToDatabase } from '@database'

import { createHttpServer } from './server'

async function bootstrap(): Promise<void> {
  try {
    await connectToDatabase()
    createHttpServer(createApp())
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

bootstrap()
