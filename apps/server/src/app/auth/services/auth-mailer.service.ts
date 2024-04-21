import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMailerService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async sendVerifyUserEmail(uid: string, email: string): Promise<void> {
    // TODO: Finish send email logic
    return this.mailerService.sendMail({
      to: email,
      subject: 'Verify email',
      html: `<a href="${this.configService.get(
        'APP_DOMAIN'
      )}/auth/verify/${uid}">Click here to verify email</a>`,
    });
  }
}
