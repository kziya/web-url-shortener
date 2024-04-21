import { Injectable } from '@nestjs/common';

import { UserDocument } from '@web-url-shortener/domain';
import { UserRepository } from '../../user/user.repository';
import { EmailOrPasswordNotValidException } from '../exceptions/email-or-password-not-valid.exception';
import { UserNotExistsException } from '../exceptions/user-not-exists.exception';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { UidNotValidOrExpiredException } from '../exceptions/uid-not-valid-or-expired.exception';
import { UserAlreadyVerifiedException } from '../exceptions/user-already-verified.exception';
import { EmailNotValidException } from '../exceptions/email-not-valid.exception';
import { ConfirmPasswordDoesNotMatchException } from '../exceptions/confirm-password-does-not-match.exception';

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

  async validateGetVerifyStatus(user: UserDocument): Promise<void> {
    if (!user) {
      throw new UserNotExistsException();
    }
  }

  async validateVerify(email: string): Promise<void> {
    if (!email) {
      throw new UidNotValidOrExpiredException();
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

  async validateSendResetPasswordEmail(email: string): Promise<void> {
    this.validateEmail(email);
    await this.validateUserExists(email);
  }

  async validateResetPasswordByUid(
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    if (!email) {
      throw new UidNotValidOrExpiredException();
    }

    if (password !== confirmPassword) {
      throw new ConfirmPasswordDoesNotMatchException();
    }

    await this.validateUserExists(email);
  }

  private validateEmail(email: string): void {
    if (!email) {
      throw new EmailNotValidException();
    }
  }

  private validateEmailAndPassword(email: string, password: string): void {
    this.validateEmail(email);

    if (!password) {
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
