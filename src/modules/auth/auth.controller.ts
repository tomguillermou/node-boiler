import { Request, Response } from 'express';

import { ApiController } from '@core/api';

import { authService } from './auth.service';

class AuthController extends ApiController {
    constructor() {
        super();
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const jwt = await authService.loginUser(req.body);

            this.apiService.sendJson(res, { jwt });
        } catch (error) {
            this.apiService.sendError(res, error as Error);
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const jwt = await authService.registerUser(req.body);

            this.apiService.sendJson(res, { jwt });
        } catch (error) {
            this.apiService.sendError(res, error as Error);
        }
    }
}

export const authController = new AuthController();
