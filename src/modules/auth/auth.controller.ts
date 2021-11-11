import { Request, Response } from 'express';

import { apiService } from '@core/api';

import { authService } from './auth.service';

class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const jwt = await authService.loginUser(req.body);

            apiService.sendJson(res, { jwt });
        } catch (error) {
            apiService.sendError(res, error as Error);
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const jwt = await authService.registerUser(req.body);

            apiService.sendJson(res, { jwt });
        } catch (error) {
            apiService.sendError(res, error as Error);
        }
    }
}

export const authController = new AuthController();
