import config from 'config'
import { Types, connect, connection, disconnect, isValidObjectId } from 'mongoose'

export async function connectToDatabase(): Promise<void> {
  const uri = config.get<string>('database.uri')

  await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  console.log('Database: connected')
}

export async function disconnectFromDatabase(): Promise<void> {
  await disconnect()

  console.log('Database: disconnected')
}

export function generateId(value?: string): Types.ObjectId {
  return typeof value === 'string' && isValidObjectId(value)
    ? new Types.ObjectId(value)
    : new Types.ObjectId()
}

export async function clearCollections(): Promise<void> {
  if (config.get('environment') === 'test') {
    const { collections } = connection

    for (const key in collections) {
      if (Object.prototype.hasOwnProperty.call(collections, key)) {
        await collections[key].deleteMany({})
      }
    }
  }
}
