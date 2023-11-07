import config from 'config'
import jwt from 'jsonwebtoken'

export class Jwt {
  private static readonly secret = config.get<string>('encryption.jwtSecret')

  public static verify(payload: string): string | null {
    const token = jwt.verify(payload, this.secret)

    return typeof token === 'string' ? token : null
  }

  public static sign(payload: string): string {
    return jwt.sign(payload, this.secret)
  }
}
