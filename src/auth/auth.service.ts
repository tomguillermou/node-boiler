import config from 'config'
import jwt from 'jsonwebtoken'
import { Service } from 'typedi'

import { compare } from '@encryption'
import { User, UserRepository } from '@users'

import { CredentialsDto } from './credentials.dto'

const jwtSecret = config.get<string>('jwtSecret')

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid token')
  }
}

@Service()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async loginUser(credentials: CredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.getByEmail(credentials.email)

    if (user && compare(credentials.password, user.password)) {
      return { accessToken: this.signToken(user) }
    }

    throw new InvalidCredentialsError()
  }

  public async registerUser(user: User): Promise<{ accessToken: string }> {
    const registeredUser = await this.userRepository.createUser(user)

    return { accessToken: this.signToken(registeredUser) }
  }

  public async loginToken(accessToken: string): Promise<User> {
    const userId = jwt.verify(accessToken, jwtSecret)

    if (typeof userId === 'string') {
      const user = await this.userRepository.getById(userId)

      if (user) {
        return user
      }
    }

    throw new InvalidTokenError()
  }

  private signToken(user: User): string {
    return jwt.sign(String(user._id), jwtSecret)
  }
}
