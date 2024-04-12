import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { EmailOrPasswordNotValidException } from '../exceptions/email-or-password-not-valid.exception';

@Injectable()
export class AuthHashService {
  private readonly SALT_OR_ROUND = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_OR_ROUND);
  }

  async verifyHash(password: string, hash: string): Promise<void> {
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      throw new EmailOrPasswordNotValidException();
    }
  }
}
