import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../user/user.repository';
import { EmailOrPasswordNotValidException } from '../exceptions/email-or-password-not-valid.exception';
import { UserNotExistsException } from '../exceptions/user-not-exists.exception';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { VerifyUidNotValidOrExpiredException } from '../exceptions/verify-uid-not-valid-or-expired.exception';
import { UserDocument } from '@web-url-shortener/domain';
import { UserAlreadyVerifiedException } from '../exceptions/user-already-verified.exception';

@Injectable()
export class AuthValidatorService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateLogin(email: string, password: string): Promise<void> {
    this.validateEmailAndPassword(email, password);
    await this.validateUserExists(email);
  }

  async validateSignUp(email: string, password: string): Promise<void> {
    this.validateEmailAndPassword(email, password);
    await this.validateUserNotExists(email);
  }

  async validateVerify(email: string): Promise<void> {
    if (!email) {
      throw new VerifyUidNotValidOrExpiredException();
    }

    await this.validateUserExists(email);
  }

  async validateSendVerifyEmail(user: UserDocument): Promise<void> {
    if (!user) {
      throw new UserNotExistsException();
    }

    if (user.isVerified) {
      throw new UserAlreadyVerifiedException();
    }
  }

  private validateEmailAndPassword(email: string, password: string): void {
    if (!email || !password) {
      throw new EmailOrPasswordNotValidException();
    }
  }

  private async validateUserExists(email: string): Promise<void> {
    const isExists = await this.userRepository.checkUserExistsByEmail(email);

    if (!isExists) {
      throw new UserNotExistsException();
    }
  }

  private async validateUserNotExists(email: string): Promise<void> {
    const isExists = await this.userRepository.checkUserExistsByEmail(email);

    if (isExists) {
      throw new UserAlreadyExistsException();
    }
  }
}
