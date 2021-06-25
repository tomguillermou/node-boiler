import { Response } from 'express';

import { HttpCode } from '@core/enums';
import { ApiError } from '@core/models/api-errors.model';

export function sendError(res: Response, error: Error | ApiError): void {
    if (process.env.NODE_ENV === 'development') {
        console.error(error);
    }

    if (error instanceof ApiError) {
        res.status(error.httpCode).json({ message: error.message });
    } else {
        res.status(HttpCode.InternalServerError).json({ message: 'Internal server error' });
    }
}

export function sendJson(res: Response, data: unknown): void {
    res.status(HttpCode.Success).json({
        success: true,
        data,
    });
}
