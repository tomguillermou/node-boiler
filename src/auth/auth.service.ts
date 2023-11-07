import { Service } from 'typedi'

import { User, UserRepository } from '@users'
import { Hash, Jwt } from '@utils'

import { LoginTokenDto, LoginUserDto, RegisterUserDto } from './dto'
import { InvalidCredentialsError } from './errors'

@Service()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async loginUser(params: LoginUserDto): Promise<{ accessToken: string } | null> {
    const { email, password } = params

    const user = await this.userRepository.getByEmail(email)

    if (user && Hash.compare(password, user.password)) {
      return { accessToken: Jwt.sign(String(user._id)) }
    }
    throw new InvalidCredentialsError()
  }

  public async registerUser(params: RegisterUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.createUser(params)

    return { accessToken: Jwt.sign(String(user._id)) }
  }

  public loginToken(params: LoginTokenDto): Promise<User | null> {
    const { accessToken } = params
    const userId = Jwt.verify(accessToken)

    if (typeof userId === 'string') {
      return this.userRepository.getById(userId)
    }
    return Promise.resolve(null)
  }
}
