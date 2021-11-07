import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { plugRoutes } from '@config/routes';

export function createExpressApp(): express.Express {
    const app = express();

    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // Enabling CORS Pre-Flight
    // app.options('*', cors()); // include before other routes

    plugRoutes(app);

    return app;
}
