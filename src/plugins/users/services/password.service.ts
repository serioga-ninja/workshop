import { pbkdf2Sync, randomBytes } from 'crypto';
import { injectable } from 'tsyringe';

@injectable()
export default class PasswordService {
  generatePassword(password: string) {
    // Generate a random salt
    const salt = randomBytes(16).toString('hex');

    // Hash the password with the salt
    const hashedPassword = this.generateHash(password, salt);

    // Return the salt and hashed password
    return { salt, hashedPassword };
  }

  comparePasswords(password: string, salt: string, hashedPassword: string): boolean {
    // Hash the input password with the provided salt
    const hash = this.generateHash(password, salt);

    // Compare the hashed input password with the provided hashed password
    return hash === hashedPassword;
  }

  generateHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }
}
