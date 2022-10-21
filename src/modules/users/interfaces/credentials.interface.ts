import { User } from './user.interface'

export type UserCredentials = Pick<User, 'email' | 'password'>
