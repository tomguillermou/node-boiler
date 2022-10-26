import express, { Express, Router } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import { ConfigService } from '@config'

import { authJwt } from '../middlewares'

export abstract class ApiService {
    public static createRouter(options: { auth: 'jwt' | 'none' }): Router {
        const router = Router()

        if (options.auth === 'jwt') {
            router.use(authJwt)
        }

        return router
    }

    public static createApp(): Express {
        const app = express()

        // Disable request logging for test environment
        if (ConfigService.get('NODE_ENV') !== 'test') {
            app.use(morgan('dev'))
        }

        app.use(helmet())
        app.use(cors())
        app.use(express.json())

        return app
    }
}
