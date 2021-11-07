import express from 'express';

// Import routes and middlewares here
import { authRoutes, authUserMiddleware } from '@modules/auth';
import { userRoutes } from '@modules/users';

export function plugRoutes(app: express.Express): void {
    app.use('/auth', userRoutes);
    app.use('/users', authUserMiddleware, authRoutes);

    app.use((req, res) => {
        return res.json({ message: 'Endpoint not found' });
    });
}
