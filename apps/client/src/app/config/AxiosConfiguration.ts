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
  (axiosResponse) => {
    return axiosResponse;
  },
  async (axiosErrorResponse) => {
    if (axiosErrorResponse.response.status === 401) {
      const isRetried = axiosErrorResponse.config.isRetried;

      if (isRetried) {
        return AuthService.logout();
      }

      axiosErrorResponse.config.isRetried = true;

      await AuthService.refreshToken();

      return axiosInstance.request(axiosErrorResponse.config);
    }
    return axiosErrorResponse;
  }
);

export { axiosInstance };
