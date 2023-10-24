import { Schema, model } from 'mongoose'

import { User } from './user'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.index({ email: 1 }, { unique: true })

export const userModel = model<User & Document>('User', userSchema)
