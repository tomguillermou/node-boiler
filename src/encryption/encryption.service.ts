import bcrypt from 'bcrypt'
import config from 'config'
import { Service } from 'typedi'

@Service()
export class EncryptionService {
  private readonly saltRounds = config.get<string>('saltRounds')

  public compare(plaintext: string, hash: string): boolean {
    return bcrypt.compareSync(plaintext, hash)
  }

  public encrypt(plaintext: string): string {
    return bcrypt.hashSync(plaintext, this.saltRounds)
  }
}
