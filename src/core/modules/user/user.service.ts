import { BadRequestError } from '@core/models';

import { jwtService, encryptionService } from '@core/services';

import { UserCredentials, UserDocument, UserDTO } from './user.interfaces';
import { UserModel } from './user.model';

class UserService {
    /**
     * Authenticate user with given credentials.
     * @returns Signed JSON web token
     */
    async authenticateUser({ email, password }: UserCredentials): Promise<string> {
        const user = await UserModel.findOne({ email }, '+password').exec();

        if (!user || !encryptionService.compareHash(password, user.password)) {
            throw new BadRequestError('Invalid credentials');
        }

        return jwtService.sign(user._id);
    }

    /**
     * Create a new user.
     * @returns Signed JSON web token
     */
    async createUser(newUser: UserDTO): Promise<string> {
        const user = new UserModel(newUser);
        await user.save();

        return jwtService.sign(user._id);
    }

    /**
     * Find user with given ID.
     * @returns User found, and null otherwise
     */
    async findUserById(id: string): Promise<UserDocument | null> {
        return UserModel.findById(id).exec();
    }
}

export const userService = new UserService();
