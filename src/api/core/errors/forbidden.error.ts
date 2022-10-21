import { HttpCode } from '../enums';

import { ApiError } from './api.error';

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(HttpCode.Forbidden, message);
    }
}
