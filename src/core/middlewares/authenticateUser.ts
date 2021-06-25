import { NextFunction, Request, Response } from 'express';

import { BadRequestError, ForbiddenError } from '@core/models/api-errors.model';
import { jwtService, responseService } from '@core/services';

import { userService } from '@core/modules/user';

export async function authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const authorizationHeader = req?.headers?.authorization;

        if (!authorizationHeader || !authorizationHeader.split(' ').pop()) {
            throw new BadRequestError('Missing authorization header');
        }

        const decodedToken = jwtService.verify(authorizationHeader.split(' ').pop() as string);

        const authUser = await userService.findUserById(decodedToken);

        if (!authUser) {
            throw new ForbiddenError('Authentication failed');
        }

        res.locals.authUser = authUser;

        next();
    } catch (error) {
        responseService.sendError(res, error);
    }
}
