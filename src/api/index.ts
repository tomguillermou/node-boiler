import { ApiService } from './core'

import { authRouter } from './auth.api'

const api = ApiService.createApp()

api.use('/auth', authRouter)

export { api }
