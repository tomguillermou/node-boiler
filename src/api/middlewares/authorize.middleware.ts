import { Action } from 'routing-controllers'
import Container from 'typedi'

import { AuthService } from '@auth'

export async function authorize(action: Action): Promise<boolean> {
  try {
    const token = action.request.headers.authorization

    const user = await Container.get(AuthService).loginToken(token)

    if (user) {
      return true
    }

    return false
  } catch (error) {
    console.log(error)

    return false
  }
}
