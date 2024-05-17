import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { RedirectService } from './redirect.service';

@Controller()
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':uuid')
  async redirectByUuid(@Res() res: Response, @Param('uuid') uuid: string) {
    return this.redirectService.redirectByUid(res, uuid);
  }
}
