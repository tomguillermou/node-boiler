import winston from 'winston'

import { ConfigService } from '@config'

export const Logger = winston.createLogger({
    level: 'info',
    levels: winston.config.npm.levels,
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'server.log' }),
    ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (ConfigService.get('NODE_ENV') === 'development') {
    Logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    )
}
