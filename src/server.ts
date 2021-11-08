import http from 'http';

import { logger } from '@core/logger';

const PORT = process.env.PORT;

export function createHttpServer(app: http.RequestListener): void {
    http.createServer(app).listen(PORT);

    logger.info('Server now listening');
}
