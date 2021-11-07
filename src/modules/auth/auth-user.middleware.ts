import { NextFunction, Request, Response } from 'express';

import { BadRequestError, ForbiddenError, apiService } from '@core/api';
import { jwtService } from '@core/services';
import { userService } from '@modules/users';

export async function authUserMiddleware(
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
        apiService.sendError(res, error as Error);
    }
}
