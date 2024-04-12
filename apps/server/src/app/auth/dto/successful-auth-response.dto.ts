import { User } from '../../user/user.schema';

export class SuccessfulAuthResponseDto {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}
