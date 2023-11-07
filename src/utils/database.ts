import config from 'config'
import { connect, disconnect } from 'mongoose'

export class Database {
  static async connectToDatabase(): Promise<void> {
    const uri = config.get<string>('database.uri')

    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log('Database: connected')
  }

  static async disconnectFromDatabase(): Promise<void> {
    await disconnect()

    console.log('Database: disconnected')
  }
}
