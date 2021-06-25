import jwt from 'jsonwebtoken';

import { BadRequestError } from '@core/models/api-errors.model';
import { validationService } from '@core/services';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function sign(payload: string): string {
    return jwt.sign(payload, JWT_SECRET);
}

export function verify(payload: string): string {
    const token = jwt.verify(payload, JWT_SECRET);

    if (typeof token !== 'string') {
        throw new BadRequestError('Invalid JWT');
    }

    if (!validationService.isValidId(token)) {
        throw new BadRequestError('Invalid JWT');
    }

    return token;
}
