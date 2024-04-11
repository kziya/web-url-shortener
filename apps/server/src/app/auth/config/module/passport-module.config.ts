import { AuthModuleOptions } from '@nestjs/passport';

export const PassportModuleConfig: AuthModuleOptions = {
  defaultStrategy: 'jwt',
  session: false,
  property: 'user',
};
