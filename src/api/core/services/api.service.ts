import { Response } from 'express'

import { Logger } from '@logger'

import { HttpCode } from '../enums'
import { ApiError } from '../errors'

export class ApiService {
    public getResponseWithError(res: Response, error: Error): Response {
        if (!(error instanceof ApiError)) {
            if (process.env.NODE_ENV === 'development') {
                Logger.error(error)
            }

            return res
                .status(HttpCode.InternalServerError)
                .json({ message: 'Internal server error' })
        }

        return res.status(error.httpCode).json({ message: error.message })
    }

    public getResponseWithData(res: Response, data: unknown): Response {
        return res.status(HttpCode.Success).json({
            success: true,
            data,
        })
    }
}

export const apiService = new ApiService()
