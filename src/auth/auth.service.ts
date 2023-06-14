import config from 'config'
import jwt from 'jsonwebtoken'
import { Service } from 'typedi'

import { compare } from '@encryption'
import { User, UserNotFoundError, UserRepository } from '@users'

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

  //   public async authUserFromJwt(jwtPayload: string): Promise<User> {
  //     const token = jwt.verify(jwtPayload, jwtSecret)

  //     if (typeof token !== 'string') {
  //       throw new InvalidTokenError()
  //     }

  //     const user = await this.userRepository.getUserById(token)

  //     if (!user) {
  //       throw new InvalidTokenError()
  //     }

  //     return user
  //   }

  public async loginUser(credentials: CredentialsDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userRepository.getUserByEmail(credentials.email)

      if (compare(credentials.password, user.password)) {
        return { accessToken: this.signTokenForUser(user) }
      }

      throw new InvalidCredentialsError()
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new InvalidCredentialsError()
      }
      throw error
    }
  }

  public async registerUser(user: User): Promise<{ accessToken: string }> {
    const registeredUser = await this.userRepository.createUser(user)

    return { accessToken: this.signTokenForUser(registeredUser) }
  }

  private signTokenForUser(user: User): string {
    return jwt.sign(String(user._id), jwtSecret)
  }
}
