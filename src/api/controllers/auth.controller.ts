import { Body, JsonController, Post, Res } from 'routing-controllers'
import { Response } from 'express'

import { AuthService, CredentialsDto, InvalidCredentialsError } from '@auth'

import { HttpStatus } from '../http-status.enum'
import { Service } from 'typedi'

@JsonController('/auth')
@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(
    @Body() credentials: CredentialsDto,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const data = await this.authService.loginUser(credentials)

      return response.status(HttpStatus.OK).send(data)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return response.status(HttpStatus.Forbidden).send({ error: 'Invalid credentials' })
      }

      console.log(error)

      return response
        .status(HttpStatus.InternalServerError)
        .send({ error: 'Internal server error' })
    }
  }

  //   @Post('/register')
  //   @HttpCode(HttpStatus.Created)
  //   public async async(@Req() req: Request): Promise<{ jwt: string }> {
  //     try {
  //       const jwt = await registerUser(req.body)

  //       return { jwt }
  //     } catch (error) {
  //       throw new InternalServerError('Internal server error')
  //     }
  //   }
}
