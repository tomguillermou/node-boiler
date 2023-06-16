import { Service } from 'typedi'

import { EncryptionService } from '@encryption'

import { User } from './user.interface'
import { userModel } from './user.model'

type CreateUser = Omit<User, '_id'> & Partial<Pick<User, '_id'>>

@Service()
export class UserRepository {
  constructor(private readonly encryptionService: EncryptionService) {}

  public async createUser(user: CreateUser): Promise<User> {
    const password = this.encryptionService.encrypt(user.password)

    const doc = await userModel.create({ ...user, password })

    return doc.toJSON()
  }

  public getByEmail(email: string): Promise<User | null> {
    return userModel.findOne({ email }).lean().exec()
  }

  public getById(id: string): Promise<User | null> {
    return userModel.findOne({ _id: id }).lean().exec()
  }
}
