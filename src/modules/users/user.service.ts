import { User, UserDocument } from './user.interfaces';
import { UserModel } from './user.model';

class UserService {
    /** Returns user with matching email, or null otherwise */
    public getUserByEmail(
        email: string,
        options = { withPassword: false }
    ): Promise<UserDocument | null> {
        const userQuery = UserModel.findOne({ email });

        if (options.withPassword) {
            userQuery.select('+password');
        }

        return userQuery.exec();
    }

    /** Creates a new user */
    public createUser(newUser: User): Promise<UserDocument> {
        return UserModel.create(newUser);
    }

    /** Returns user with matching identifier */
    public findUserById(id: string): Promise<UserDocument | null> {
        return UserModel.findById(id).exec();
    }
}

export const userService = new UserService();
