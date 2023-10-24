import { Service } from 'typedi'

import { HashService, JwtService } from '@encryption'
import { User, UserRepository } from '@users'

import { LoginTokenDto, LoginUserDto, RegisterUserDto } from './dto'

@Service()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {}

  public async loginUser(params: LoginUserDto): Promise<{ accessToken: string } | null> {
    const { email, password } = params

    const user = await this.userRepository.getByEmail(email)

    if (user && this.hashService.compare(password, user.password)) {
      return { accessToken: this.jwtService.sign(String(user._id)) }
    }
    return null
  }

  public async registerUser(params: RegisterUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.createUser(params)

    return { accessToken: this.jwtService.sign(String(user._id)) }
  }

  public loginToken(params: LoginTokenDto): Promise<User | null> {
    const { accessToken } = params
    const userId = this.jwtService.verify(accessToken)

    if (typeof userId === 'string') {
      return this.userRepository.getById(userId)
    }
    return Promise.resolve(null)
  }
}
