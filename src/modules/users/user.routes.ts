import { Router } from 'express';

import { userController } from './user.controller';

const userRoutes = Router();

userRoutes.get('/me', userController.fetchMe);
userRoutes.get('/', userController.readMany);
userRoutes.get('/:userId', userController.readOne);

export { userRoutes };
