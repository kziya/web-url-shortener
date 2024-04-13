import { SuccessfulAuthResponseDto } from '@web-url-shortener/domain';
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
}

export default new AuthHttpService();
