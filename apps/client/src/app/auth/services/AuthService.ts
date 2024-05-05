import AuthLocalstorageService from './AuthLocalstorageService';
import AuthHttpService from './AuthHttpService';
import { IAuthData } from '../AuthDataInterface';

class AuthService {
  async login(email: string, password: string): Promise<IAuthData> {
    const authData = await AuthHttpService.login(email, password);
    AuthLocalstorageService.setAuthData(authData);

    return authData;
  }

  async signUp(email: string, password: string): Promise<IAuthData> {
    const authData = await AuthHttpService.signUp(email, password);

    AuthLocalstorageService.setAuthData(authData);
    return authData;
  }

  async verifyByUid(uid: string): Promise<void> {
    await AuthHttpService.verifyByUid(uid);
    const user = AuthLocalstorageService.getUser();

    if (user) {
      user.isVerified = true;
    }

    AuthLocalstorageService.setUser(user);
  }

  async refreshToken(): Promise<void> {
    try {
      const refreshToken = AuthLocalstorageService.getRefreshToken();
      const authData = await AuthHttpService.refreshToken(refreshToken);

      AuthLocalstorageService.setAuthData(authData);
    } catch (e) {
      this.logout();
    }
  }

  async updateVerifyStatus(): Promise<boolean> {
    const result = await AuthHttpService.getVerifyStatus();
    const authData = this.getAuthData();
    authData.user.isVerified = result.status;

    AuthLocalstorageService.setAuthData(authData);
    return result.status;
  }

  logout(): void {
    AuthLocalstorageService.clearAuthData();
    window.location.href = '/auth/login';
  }

  getAuthData(): IAuthData {
    return AuthLocalstorageService.getAuthData();
  }
}

export default new AuthService();
