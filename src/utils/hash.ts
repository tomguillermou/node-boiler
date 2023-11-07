import bcrypt from 'bcrypt'
import config from 'config'

export class Hash {
  private static readonly saltRounds = config.get<string>('encryption.saltRounds')

  public static compare(plaintext: string, hash: string): boolean {
    return bcrypt.compareSync(plaintext, hash)
  }

  public static hash(plaintext: string): string {
    return bcrypt.hashSync(plaintext, this.saltRounds)
  }
}
