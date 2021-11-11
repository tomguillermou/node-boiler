import { Request, Response } from 'express';

import { InternalServerError, apiService } from '@core/api';

import { userService } from './user.service';

class UserController {
    async readMany(req: Request, res: Response): Promise<void> {
        try {
            throw new InternalServerError('Endpoint not implemented');
        } catch (error) {
            apiService.sendError(res, error as Error);
        }
    }

    async readOne(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);

            apiService.sendJson(res, { user });
        } catch (error) {
            apiService.sendError(res, error as Error);
        }
    }

    async fetchMe(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.findUserById(res.locals?.authUser?._id);

            apiService.sendJson(res, { user });
        } catch (error) {
            apiService.sendError(res, error as Error);
        }
    }
}

export const userController = new UserController();
