import express, { Express, Router } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import { authJwt } from '../middlewares'

export class ApiFactory {
    public static createApi(): Express {
        const app = express()

        app.use(morgan('dev'))
        app.use(helmet())
        app.use(cors())
        app.use(express.json())

        return app
    }

    public static createRouter(options: { auth: 'jwt' | 'none' }): Router {
        const api = Router()

        if (options.auth === 'jwt') {
            api.use(authJwt)
        }

        return api
    }
}
