import { User } from '@web-url-shortener/domain';

export interface IAuthData {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}
