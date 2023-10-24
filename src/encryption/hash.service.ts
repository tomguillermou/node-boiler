import bcrypt from 'bcrypt'
import config from 'config'
import { Service } from 'typedi'

@Service()
export class HashService {
  private readonly saltRounds = config.get<string>('encryption.saltRounds')

  public compare(plaintext: string, hash: string): boolean {
    return bcrypt.compareSync(plaintext, hash)
  }

  public hash(plaintext: string): string {
    return bcrypt.hashSync(plaintext, this.saltRounds)
  }
}
