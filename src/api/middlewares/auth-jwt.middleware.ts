// import { NextFunction, Request, Response } from 'express'

// import { InvalidTokenError, authUserFromJwt } from '@auth'

// import { sendBadRequestError, sendForbiddenError, sendInternalError } from '../services'

// class MissingTokenFromHeaderError extends Error {
//   constructor() {
//     super('Missing bearer token from authorization header')
//   }
// }

// export async function authJwt(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> {
//   try {
//     const bearerToken = req?.headers?.authorization?.split(' ').pop()

//     if (!bearerToken) {
//       throw new MissingTokenFromHeaderError()
//     }

//     res.locals.authUser = await authUserFromJwt(bearerToken)
//   } catch (error) {
//     if (error instanceof InvalidTokenError) {
//       return sendForbiddenError(res, error)
//     }
//     if (error instanceof MissingTokenFromHeaderError) {
//       return sendBadRequestError(res, error)
//     }
//     return sendInternalError(res, error as Error)
//   }

//   return next()
// }
