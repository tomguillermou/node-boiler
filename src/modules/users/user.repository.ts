import { encryptionService, EncryptionService } from '@encryption'

import { User } from './interfaces'
import { UserModel, userModel } from './user.model'

export class UserRepository {
    constructor(private model: UserModel, private encryptionService: EncryptionService) {}

    public async createUser(newUser: User): Promise<User> {
        const hashedPassword = this.encryptionService.encrypt(newUser.password)

        const doc = await this.model.create({ ...newUser, password: hashedPassword })

        return doc.toObject()
    }

    public getByEmail(email: string, options = { withPassword: false }): Promise<User | null> {
        const userQuery = this.model.findOne({ email })

        if (options.withPassword) {
            userQuery.select('+password')
        }

        return userQuery.lean().exec()
    }

    public getById(id: string): Promise<User | null> {
        return this.model.findById(id).lean().exec()
    }
}

export const userRepository = new UserRepository(userModel, encryptionService)
