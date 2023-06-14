import bcrypt from 'bcrypt'
import config from 'config'

const saltRounds = config.get<string>('saltRounds')

export function compare(plaintext: string, hash: string): boolean {
  return bcrypt.compareSync(plaintext, hash)
}

export function encrypt(plaintext: string): string {
  return bcrypt.hashSync(plaintext, saltRounds)
}
