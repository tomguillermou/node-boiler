import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export class ConfigService {
    public static get(key: string): string | undefined {
        return process.env[key]
    }
}
