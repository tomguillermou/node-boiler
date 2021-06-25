import { HttpCode } from '@core/enums';

export abstract class ApiError {
    constructor(public readonly httpCode: number, public readonly message: string) {}
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(HttpCode.BadRequest, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(HttpCode.Forbidden, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(HttpCode.NotFound, message);
    }
}

export class InternalServerError extends ApiError {
    constructor(message: string) {
        super(HttpCode.InternalServerError, message);
    }
}
