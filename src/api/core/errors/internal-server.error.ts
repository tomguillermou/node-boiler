import { HttpCode } from '../enums';

import { ApiError } from './api.error';

export class InternalServerError extends ApiError {
    constructor(message: string) {
        super(HttpCode.InternalServerError, message);
    }
}
