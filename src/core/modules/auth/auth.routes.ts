import { Router } from 'express';

import { authController } from './auth.controller';
import { authValidators } from './auth.validators';

const authRoutes = Router();

authRoutes.post('/login', authValidators.validateLogin, authController.login);

authRoutes.post('/register', authValidators.validateRegister, authController.register);

export { authRoutes };
