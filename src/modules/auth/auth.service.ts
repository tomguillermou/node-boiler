import { EncryptionService, encryptionService } from '@encryption'
import { JwtService, jwtService } from '@jwt'
import { User, UserCredentials, UserRepository, userRepository } from '@users'

import { InvalidCredentialsError } from './errors'

export class AuthService {
    constructor(
        private encryptionService: EncryptionService,
        private jwtService: JwtService,
        private userRepository: UserRepository
    ) {}

    public async loginUser({ email, password }: UserCredentials): Promise<string> {
        const user = await this.userRepository.getByEmail(email, { withPassword: true })

        const areValidCredentials =
            user && this.encryptionService.compareHash(password, user.password)

        if (!areValidCredentials) {
            throw new InvalidCredentialsError()
        }

        return this.signTokenForUser(user)
    }

    public async registerUser(newUser: User): Promise<string> {
        const user = await this.userRepository.createUser(newUser)

        return this.signTokenForUser(user)
    }

    private signTokenForUser(user: User): string {
        return this.jwtService.signToken(user._id)
    }
}

export const authService = new AuthService(encryptionService, jwtService, userRepository)
