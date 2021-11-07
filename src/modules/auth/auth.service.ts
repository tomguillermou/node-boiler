import { BadRequestError } from '@core/api';
import { encryptionService, jwtService } from '@core/services';
import { User, UserCredentials, userService } from '@modules/users';

class AuthService {
    public async loginUser({ email, password }: UserCredentials): Promise<string> {
        const user = await userService.getUserByEmail(email, { withPassword: true });

        if (user && encryptionService.compareHash(password, user.password)) {
            return jwtService.sign(user._id);
        }

        throw new BadRequestError('Invalid credentials');
    }

    public async registerUser(newUser: User): Promise<string> {
        const user = await userService.createUser(newUser);

        return jwtService.sign(user._id);
    }
}

export const authService = new AuthService();
