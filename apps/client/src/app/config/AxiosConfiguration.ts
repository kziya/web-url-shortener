import axios from 'axios';
import AppConfiguration from './AppConfiguration';
import AuthService from '../auth/services/AuthService';
import AuthLocalstorageService from '../auth/services/AuthLocalstorageService';

const axiosInstance = axios.create({
  baseURL: AppConfiguration.API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = AuthLocalstorageService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (errorResponse) => {
    if (errorResponse.response.status === 401) {
      const isRetried = errorResponse.config.isRetried;

      if (isRetried) {
        return AuthService.logout();
      }

      errorResponse.config.isRetried = true;

      await AuthService.refreshToken();

      return axiosInstance.request(errorResponse.config);
    }
    return errorResponse;
  }
);

export { axiosInstance };
