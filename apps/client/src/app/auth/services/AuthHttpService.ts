import {
  GetVerifyStatusResponseDto,
  SuccessfulAuthResponseDto,
} from '@web-url-shortener/domain';
import { axiosInstance } from '../../config/AxiosConfiguration';
import { AxiosResponse } from 'axios';

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

  async sendVerifyMail(): Promise<AxiosResponse<SuccessfulAuthResponseDto>> {
    return axiosInstance.post('/auth/verify/send');
  }

  async verifyByUid(uid: string): Promise<void> {
    return axiosInstance.post(`/auth/verify/${uid}`);
  }

  async sendResetPasswordMail(email: string): Promise<AxiosResponse> {
    return axiosInstance.post('/auth/reset-password/send', { email });
  }

  async validateResetPasswordUid(uid: string): Promise<void> {
    return axiosInstance.get(`/auth/reset-password/${uid}`);
  }

  async resetPassword(
    uid: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    return axiosInstance.post(`/auth/reset-password/${uid}`, {
      password,
      confirmPassword,
    });
  }
}

export default new AuthHttpService();
