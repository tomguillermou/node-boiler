import { Exclude, Expose } from 'class-transformer'
import { Types } from 'mongoose'

export class User {
  @Exclude()
  _id!: Types.ObjectId

  @Expose()
  get id(): string {
    return String(this._id)
  }

  @Expose()
  email!: string

  @Exclude()
  password!: string
}
