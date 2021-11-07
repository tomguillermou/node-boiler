import jwt from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '../api';

export class JwtService {
    private readonly JWT_SECRET = process.env.JWT_SECRET as string;

    public sign(payload: string): string {
        return jwt.sign(payload, this.JWT_SECRET);
    }

    public verify(payload: string): string {
        const token = jwt.verify(payload, this.JWT_SECRET);

        if (typeof token !== 'string') {
            throw new BadRequestError('Invalid JWT');
        }

        if (!isValidObjectId(token)) {
            throw new BadRequestError('Invalid JWT');
        }

        return token;
    }
}

export const jwtService = new JwtService();
