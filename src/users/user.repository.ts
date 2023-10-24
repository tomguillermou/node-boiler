import { plainToClass } from 'class-transformer'
import { Service } from 'typedi'

import { HashService } from '@encryption'

import { User } from './user'
import { userModel } from './user.model'

import { CreateUserDto } from './dto'

@Service()
export class UserRepository {
  constructor(private readonly hashService: HashService) {}

  public async createUser(user: CreateUserDto): Promise<User> {
    const password = this.hashService.hash(user.password)

    const doc = await userModel.create({ ...user, password })

    return plainToClass(User, doc.toJSON())
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({ email }).lean().exec()

    return plainToClass(User, user)
  }

  public getById(id: string): Promise<User | null> {
    return userModel.findOne({ _id: id }).lean().exec()
  }
}
