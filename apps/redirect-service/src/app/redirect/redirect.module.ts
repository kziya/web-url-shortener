import { Module } from '@nestjs/common';

import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [RedirectController],
  providers: [RedirectService],
})
export class RedirectModule {}
