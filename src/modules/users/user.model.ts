import { Model, model, Schema } from 'mongoose'

import { User } from './interfaces'

const userSchema = new Schema<User>({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        select: false,
        type: String,
    },
})

userSchema.index({ email: 1 }, { unique: true })

export type UserModel = Model<User & Document>

export const userModel = model<User & Document>('User', userSchema)
