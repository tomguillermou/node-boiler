import { Response } from 'express';

import { HttpCode } from './http-code.enum';
import { ApiError } from './api-error';

export class ApiService {
    public sendError(res: Response, error: Error): void {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error(error);
        }

        if (error instanceof ApiError) {
            res.status(error.httpCode).json({ message: error.message });
        } else {
            res.status(HttpCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }

    public sendJson(res: Response, data: unknown): void {
        res.status(HttpCode.Success).json({
            success: true,
            data,
        });
    }
}

export const apiService = new ApiService();
