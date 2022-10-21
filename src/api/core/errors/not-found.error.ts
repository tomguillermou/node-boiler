import { HttpCode } from '../enums';

import { ApiError } from './api.error';

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(HttpCode.NotFound, message);
    }
}
