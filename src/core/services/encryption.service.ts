import bcrypt from 'bcrypt';

export class EncryptionService {
    private readonly SALT_ROUNDS = Number.parseInt(process.env.SALT_ROUNDS as string);

    public compareHash(plaintext: string, hash: string): boolean {
        return bcrypt.compareSync(plaintext, hash);
    }

    public encrypt(plaintext: string): string {
        return bcrypt.hashSync(plaintext, this.SALT_ROUNDS);
    }
}

export const encryptionService = new EncryptionService();
