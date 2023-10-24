import config from 'config'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'

@Service()
export class JwtService {
  private readonly _secret = config.get<string>('encryption.jwtSecret')

  public verify(payload: string): string | null {
    const token = jwt.verify(payload, this._secret)

    return typeof token === 'string' ? token : null
  }

  public sign(payload: string): string {
    return jwt.sign(payload, this._secret)
  }
}
