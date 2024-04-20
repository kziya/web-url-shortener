import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(uid: string, email: string): Promise<void> {
    // TODO: Finish send email logic
  }
}
