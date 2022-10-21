import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'

export class InvalidJwtError extends Error {
    constructor() {
        super('Invalid JWT')
    }
}

export class JwtService {
    constructor(private readonly secret: string) {}

    public sign(payload: string): string {
        return jwt.sign(payload, this.secret)
    }

    public verify(payload: string): string {
        const token = jwt.verify(payload, this.secret)

        if (typeof token !== 'string') {
            throw new InvalidJwtError()
        }

        if (!isValidObjectId(token)) {
            throw new InvalidJwtError()
        }

        return token
    }
}

export const jwtService = new JwtService(process.env.JWT_SECRET as string)
