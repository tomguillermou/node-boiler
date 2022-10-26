import { createServer, RequestListener } from 'http'

import { Logger } from '@logger'
import { ConfigService } from '@config'

export function createHttpServer(app: RequestListener): void {
    const port = ConfigService.get('PORT')

    if (!port) {
        throw new Error('Port must be provided to start the server.')
    }

    createServer(app).listen(port)

    Logger.info('Server: listening')
}
