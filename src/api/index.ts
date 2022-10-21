import { ApiFactory } from './core'

import { authApi } from './auth.api'

const api = ApiFactory.createApi()

api.use('/auth', authApi)

export { api }
