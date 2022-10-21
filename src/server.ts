import http from 'http'

import { Logger } from '@logger'
import { ConfigService } from '@config'

export function createHttpServer(app: http.RequestListener): void {
    const port = ConfigService.get('PORT')

    if (!port) {
        throw new Error('Port must be provided to start the server.')
    }

    http.createServer(app).listen(port)

    Logger.info('Server: listening')
}
