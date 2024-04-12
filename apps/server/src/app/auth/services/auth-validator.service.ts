import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../user/user.repository';
import { EmailOrPasswordNotValidException } from '../exceptions/email-or-password-not-valid.exception';
import { UserNotExistsException } from '../exceptions/user-not-exists.exception';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class AuthValidatorService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateSignUp(email: string, password: string): Promise<void> {
    this.validateEmailAndPassword(email, password);
    await this.validateUserNotExists(email);
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
