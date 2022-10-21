import http from 'http'

import { Logger } from '@logger'

const PORT = process.env.PORT

export function createHttpServer(app: http.RequestListener): void {
    http.createServer(app).listen(PORT)

    Logger.info('Server: listening')
}
