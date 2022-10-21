import { HttpCode } from '../enums';

export abstract class ApiError extends Error {
    constructor(public readonly httpCode: HttpCode, public readonly message: string) {
        super(message);
    }
}
