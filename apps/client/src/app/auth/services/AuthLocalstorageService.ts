import { SuccessfulAuthResponseDto } from '@web-url-shortener/domain';
import { IAuthData } from '../AuthDataInterface';

export const REFRESH_TOKEN_LOCALSTORAGE_KEY = 'refreshToken';
export const ACCESS_TOKEN_LOCALSTORAGE_KEY = 'accessToken';
export const USER_LOCALSTORAGE_KEY = 'user';

class AuthLocalstorageService {
  setAuthData(responseDto: SuccessfulAuthResponseDto) {
    localStorage.setItem(
      REFRESH_TOKEN_LOCALSTORAGE_KEY,
      responseDto.refreshToken
    );
    localStorage.setItem(
      ACCESS_TOKEN_LOCALSTORAGE_KEY,
      responseDto.accessToken
    );
    localStorage.setItem(
      USER_LOCALSTORAGE_KEY,
      JSON.stringify(responseDto.user)
    );
  }

  getAuthData(): IAuthData {
    return {
      refreshToken: localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY),
      accessToken: localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY),
      user: this.getUser(),
    };
  }

  clearAuthData(): void {
    localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }

  getUser(): IAuthData['user'] {
    return JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) ?? 'null');
  }

  setUser(user: IAuthData['user']) {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
  }

  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
  }
}

export default new AuthLocalstorageService();
