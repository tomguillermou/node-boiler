import { HttpCode } from '../enums';

import { ApiError } from './api.error';

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(HttpCode.BadRequest, message);
    }
}
