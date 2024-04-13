import { User } from '../../user';

export class SuccessfulAuthResponseDto {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}
