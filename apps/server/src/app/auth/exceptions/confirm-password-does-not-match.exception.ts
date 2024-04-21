import { BadRequestException } from '@nestjs/common';

export class ConfirmPasswordDoesNotMatchException extends BadRequestException {
  constructor() {
    super('CONFIRM_PASSWORD_DOES_NOT_MATCH');
  }
}
