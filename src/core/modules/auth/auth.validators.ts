import { NextFunction, Request, Response } from 'express';

import { validationService, responseService } from '@core/services';
import { BadRequestError } from '@core/models';

class AuthValidators {
    validateLogin(req: Request, res: Response, next: NextFunction): void {
        try {
            // Nothing to validate

            next();
        } catch (error) {
            responseService.sendError(res, error);
        }
    }

    validateRegister(req: Request, res: Response, next: NextFunction): void {
        try {
            if (!validationService.isValidEmail(req.body.email)) {
                throw new BadRequestError('Invalid email');
            }

            next();
        } catch (error) {
            responseService.sendError(res, error);
        }
    }
}

export const authValidators = new AuthValidators();
