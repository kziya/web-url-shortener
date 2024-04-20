import { BadRequestException } from '@nestjs/common';

export class UserAlreadyVerifiedException extends BadRequestException {
  constructor() {
    super('USER_ALREADY_VERIFIED');
  }
}
