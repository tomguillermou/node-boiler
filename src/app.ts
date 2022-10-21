import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

export function createExpressApp(): Express {
    const app = express()

    app.use(morgan('dev'))
    app.use(helmet())
    app.use(cors())
    app.use(express.json())

    return app
}
