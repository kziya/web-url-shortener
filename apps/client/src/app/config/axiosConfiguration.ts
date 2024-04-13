import axios from 'axios';
import AppConfiguration from './appConfiguration';

const axiosInstance = axios.create({
  baseURL: AppConfiguration.API_URL,
});

export { axiosInstance };
