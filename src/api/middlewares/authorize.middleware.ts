import { Action } from 'routing-controllers'
import Container from 'typedi'

import { AuthService } from '@auth'

export async function authorize(action: Action): Promise<boolean> {
  const token = action.request.headers.authorization

  const user = await Container.get(AuthService).loginToken(token)

  return Boolean(user)
}
