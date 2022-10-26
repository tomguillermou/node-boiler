import { Response } from 'express'

import { ConfigService } from '@config'
import { Logger } from '@logger'

import { HttpCode } from '../enums'
import { ApiError } from '../errors'

export class ResponseService {
    public static sendError(res: Response, error: Error): Response {
        if (!(error instanceof ApiError)) {
            if (ConfigService.get('NODE_ENV') === 'development') {
                Logger.error(error)
            }

            return res
                .status(HttpCode.InternalServerError)
                .json({ message: 'Internal server error' })
        }

        return res.status(error.httpCode).json({ message: error.message })
    }

    public static sendData(res: Response, data: unknown): Response {
        return res.status(HttpCode.Success).json({
            success: true,
            data,
        })
    }
}