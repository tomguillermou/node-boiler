import { Request, Response } from 'express'

import { authService, InvalidCredentialsError } from '@auth'

import { ApiService, ForbiddenError, ResponseService } from './core'

const authRouter = ApiService.createRouter({ auth: 'none' })

authRouter.post('/login', async (req: Request, res: Response): Promise<Response> => {
    try {
        const jwt = await authService.loginUser(req.body)

        return ResponseService.sendData(res, { jwt })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return ResponseService.sendError(res, new ForbiddenError(error.message))
        }
        return ResponseService.sendError(res, error as Error)
    }
})

authRouter.post('/register', async (req: Request, res: Response): Promise<Response> => {
    try {
        const jwt = await authService.registerUser(req.body)

        return ResponseService.sendData(res, { jwt })
    } catch (error) {
        return ResponseService.sendError(res, error as Error)
    }
})

export { authRouter }
