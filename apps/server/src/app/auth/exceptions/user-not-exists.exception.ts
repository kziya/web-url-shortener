import { BadRequestException } from '@nestjs/common';

export class UserNotExistsException extends BadRequestException {
  constructor() {
    super('USER_NOT_EXISTS');
  }
}
