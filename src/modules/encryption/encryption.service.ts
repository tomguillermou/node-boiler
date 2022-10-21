import bcrypt from 'bcrypt'

import { ConfigService } from '@config'

export class EncryptionService {
    private readonly saltRounds: number

    constructor() {
        const saltRounds = ConfigService.get('SALT_ROUNDS')

        if (!saltRounds) {
            throw new Error('Salt rounds must be provided.')
        }

        this.saltRounds = Number.parseInt(saltRounds, 10)
    }

    public compareHash(plaintext: string, hash: string): boolean {
        return bcrypt.compareSync(plaintext, hash)
    }

    public encrypt(plaintext: string): string {
        return bcrypt.hashSync(plaintext, this.saltRounds)
    }
}

export const encryptionService = new EncryptionService()
