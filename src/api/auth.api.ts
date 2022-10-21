import { Request, Response, Router } from 'express'

import { authService, InvalidCredentialsError } from '@auth'

import { apiService, ForbiddenError } from './core'

const authApi = Router()

authApi.post('/login', async (req: Request, res: Response): Promise<Response> => {
    try {
        const jwt = await authService.loginUser(req.body)

        return apiService.getResponseWithData(res, { jwt })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return apiService.getResponseWithError(res, new ForbiddenError(error.message))
        }
        return apiService.getResponseWithError(res, error as Error)
    }
})

authApi.post('/register', async (req: Request, res: Response): Promise<Response> => {
    try {
        const jwt = await authService.registerUser(req.body)

        return apiService.getResponseWithData(res, { jwt })
    } catch (error) {
        return apiService.getResponseWithError(res, error as Error)
    }
})

export { authApi }
