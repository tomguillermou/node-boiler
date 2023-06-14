import { Service } from 'typedi'

import { encrypt } from '@encryption'

import { User } from './user.interface'
import { userModel } from './user.model'

type CreateUser = Omit<User, '_id'> & Partial<Pick<User, '_id'>>

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
  }
}

@Service()
export class UserRepository {
  public async createUser(user: CreateUser): Promise<User> {
    const password = encrypt(user.password)

    const doc = await userModel.create({ ...user, password })

    return doc.toJSON()
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await userModel.findOne({ email }).lean().exec()

    if (user) {
      return user
    }
    throw new UserNotFoundError()
  }

  //   public getUserById(id: string): Promise<User | null> {
  //     return userModel.findById(id).lean().exec()
  //   }
}
