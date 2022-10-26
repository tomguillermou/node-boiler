import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' })
} else {
    dotenv.config({ path: '.env' })
}

export class ConfigService {
    public static get(key: string): string | undefined {
        return process.env[key]
    }
}
