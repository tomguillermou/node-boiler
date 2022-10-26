import { NextFunction, Request, Response } from 'express'

import { jwtService, InvalidTokenError } from '@jwt'

import { BadRequestError, ForbiddenError } from '../errors'
import { ResponseService } from '../services'

export async function authJwt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const bearerToken = req?.headers?.authorization?.split(' ').pop()

        if (!bearerToken) {
            throw new BadRequestError('Missing bearer token from authorization header')
        }

        try {
            res.locals.authUser = await jwtService.decodeToken(bearerToken)
        } catch (error) {
            if (error instanceof InvalidTokenError) {
                throw new ForbiddenError('Authentication failed')
            }
        }

        next()
    } catch (error) {
        ResponseService.sendError(res, error as Error)
    }
}
