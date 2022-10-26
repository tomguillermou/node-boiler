import { Express, Router } from 'express'

import { ApiService } from '../core'

export function createAppFromRouter(router: Router): Express {
    const app = ApiService.createApp()

    app.use(router)

    return app
}
