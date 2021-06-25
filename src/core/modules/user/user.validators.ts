import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '@core/models';
import { responseService, validationService } from '@core/services';

class UserValidators {
    validateReadMany(req: Request, res: Response, next: NextFunction): void {
        try {
            // Nothing to validate
            next();
        } catch (error) {
            responseService.sendError(res, error);
        }
    }

    validateReadOne(req: Request, res: Response, next: NextFunction): void {
        try {
            if (!validationService.isValidId(req.params.id)) {
                throw new BadRequestError('Invalid user');
            }

            next();
        } catch (error) {
            responseService.sendError(res, error);
        }
    }
}

export const userValidators = new UserValidators();
