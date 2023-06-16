import { Get, JsonController, Param, Res } from 'routing-controllers'
import { Response } from 'express'

import { HttpStatus } from '../http-status.enum'
import { Service } from 'typedi'
import { UserRepository } from '@users'

@JsonController('/users')
@Service()
export class UserController {
  constructor(private readonly userService: UserRepository) {}

  @Get('/:userId')
  public async login(
    @Param('userId') userId: string,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const user = await this.userService.getById(userId)

      if (user) {
        return response.status(HttpStatus.OK).send(user)
      }
      return response.status(HttpStatus.NotFound).send({ error: 'User not found' })
    } catch (error) {
      console.log(error)

      return response
        .status(HttpStatus.InternalServerError)
        .send({ error: 'Internal server error' })
    }
  }
}
