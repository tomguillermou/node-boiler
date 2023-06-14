import 'module-alias/register'
import 'reflect-metadata'

// import { api } from '@api'
// import { connectToDatabase } from '@database'
// import { logger } from '@logger'

// import { createHttpServer } from './server'

async function bootstrap(): Promise<void> {
  try {
    // await connectToDatabase()
    // createHttpServer(api)
  } catch (error) {
    // logger.error(error)
    process.exit(1)
  }
}

bootstrap()
