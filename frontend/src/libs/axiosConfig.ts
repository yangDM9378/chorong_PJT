import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://example.com/api';

axios.defaults.baseURL = BASE_URL;

const authApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 작업 수행
    const token = localStorage.getItem('token');

    if (token !== 'undefined') {
      config.headers.Authorization = token ? `Bearer ${token}` : null;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
