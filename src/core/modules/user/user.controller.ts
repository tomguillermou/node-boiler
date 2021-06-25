import { Request, Response } from 'express';

import { InternalServerError } from '@core/models';
import { responseService } from '@core/services';

import { userService } from './user.service';

class UserController {
    async readMany(req: Request, res: Response): Promise<void> {
        try {
            throw new InternalServerError('Endpoint not implemented');
        } catch (error) {
            responseService.sendError(res, error);
        }
    }

    async readOne(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);

            responseService.sendJson(res, { user });
        } catch (error) {
            responseService.sendError(res, error);
        }
    }

    async fetchMe(req: Request, res: Response): Promise<void> {
        try {
            const authUser = res.locals.authUser;
            const user = await userService.findUserById(authUser._id);

            responseService.sendJson(res, { user });
        } catch (error) {
            responseService.sendError(res, error);
        }
    }
}

export const userController = new UserController();
