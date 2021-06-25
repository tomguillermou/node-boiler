import { Router } from 'express';

import { authenticateUser } from '@core/middlewares';

import { userController } from './user.controller';
import { userValidators } from './user.validators';

const userRoutes = Router();

userRoutes.get('/me', authenticateUser, userController.fetchMe);

userRoutes.get('/', authenticateUser, userValidators.validateReadMany, userController.readMany);

userRoutes.get(
    '/:userId',
    authenticateUser,
    userValidators.validateReadOne,
    userController.readOne
);

export { userRoutes };
