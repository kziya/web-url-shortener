import {
  GetVerifyStatusResponseDto,
  SuccessfulAuthResponseDto,
} from '@web-url-shortener/domain';
import { axiosInstance } from '../../config/AxiosConfiguration';

class AuthHttpService {
  async login(
    email: string,
    password: string
  ): Promise<SuccessfulAuthResponseDto> {
    const response = await axiosInstance.post<SuccessfulAuthResponseDto>(
      '/auth/login',
      { email, password }
    );

    return response.data;
  }

  async signUp(
    email: string,
    password: string
  ): Promise<SuccessfulAuthResponseDto> {
    const response = await axiosInstance.post<SuccessfulAuthResponseDto>(
      '/auth/sign-up',
      {
        email,
        password,
      }
    );

    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<SuccessfulAuthResponseDto> {
    const response = await axiosInstance.post('/auth/refresh-token', {
      refreshToken,
    });

    return response.data;
  }

  async getVerifyStatus(): Promise<GetVerifyStatusResponseDto> {
    const response = await axiosInstance.get('/auth/verify/status');

    return response.data;
  }

  async sendVerifyMail(): Promise<SuccessfulAuthResponseDto> {
    return axiosInstance.post('/auth/verify/send');
  }

  async verifyByUid(uid: string): Promise<void> {
    return axiosInstance.post(`/auth/verify/${uid}`);
  }
}

export default new AuthHttpService();
