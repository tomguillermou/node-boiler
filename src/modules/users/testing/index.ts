import { DatabaseService } from '@database/testing'

import { User } from '../interfaces'
import { userRepository } from '../user.repository'

interface FieldsForGeneration {
    userId?: string
    email: string
    password: string
}

export function generateUser(fields: FieldsForGeneration): User {
    return {
        _id: DatabaseService.generateId(fields.userId),
        email: fields.email,
        password: fields.password,
    }
}

export async function storeUser(fields: FieldsForGeneration): Promise<User> {
    return userRepository.createUser(generateUser(fields))
}
