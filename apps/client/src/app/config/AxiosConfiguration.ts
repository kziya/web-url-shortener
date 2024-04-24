import axios from 'axios';
import AppConfiguration from './AppConfiguration';

const axiosInstance = axios.create({
  baseURL: AppConfiguration.API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export { axiosInstance };
