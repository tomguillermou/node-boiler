import { Router } from 'express';

// Import routes here
import { authRoutes } from '@core/modules/auth';
import { userRoutes } from '@core/modules/user';

const appRoutes = Router();

// Plug routes here
appRoutes.use('/users', authRoutes);
appRoutes.use('/auth', userRoutes);

appRoutes.use((req, res) => {
    return res.json({ message: 'Endpoint not found' });
});

export { appRoutes };
