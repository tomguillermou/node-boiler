import { RequestListener, createServer } from 'http'

import config from 'config'

export function createHttpServer(app: RequestListener): void {
  const port = config.get<number>('server.port')

  createServer(app).listen(port)

  console.log(`Server: listening on port ${port}`)
}
