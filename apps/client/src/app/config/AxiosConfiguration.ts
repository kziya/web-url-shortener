import axios from 'axios';
import AppConfiguration from './AppConfiguration';

const axiosInstance = axios.create({
  baseURL: AppConfiguration.API_URL,
});

export { axiosInstance };
