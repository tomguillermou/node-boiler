import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'

import { UserId, User, UserRepository, userRepository } from '@users'

import { InvalidTokenError } from './errors'
import { ConfigService } from '@config'

export class JwtService {
    private readonly secret: string

    constructor(private userRepository: UserRepository) {
        const secret = ConfigService.get('JWT_SECRET')

        if (!secret) {
            throw new Error('Secret must be provided')
        }

        this.secret = secret
    }

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

export const jwtService = new JwtService(userRepository)
