import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'

import { UserId, User, UserRepository, userRepository } from '@users'

import { InvalidTokenError } from './errors'

export class JwtService {
    constructor(private readonly secret: string, private userRepository: UserRepository) {}

    public signToken(userId: UserId): string {
        return jwt.sign(userId.toString(), this.secret)
    }

    public async decodeToken(payload: string): Promise<User> {
        const token = jwt.verify(payload, this.secret)

        if (typeof token !== 'string' || !isValidObjectId(token)) {
            throw new InvalidTokenError()
        }

        const user = await this.userRepository.getById(token)

        if (!user) {
            throw new InvalidTokenError()
        }

        return user
    }
}

export const jwtService = new JwtService(process.env.JWT_SECRET as string, userRepository)
