import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super('USER_ALREADY_EXISTS');
  }
}
