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

  logout(): void {
    AuthLocalstorageService.clearAuthData();
  }

  getAuthData(): IAuthData {
    return AuthLocalstorageService.getAuthData();
  }
}

export default new AuthService();
