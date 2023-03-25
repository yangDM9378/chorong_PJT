/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://j8c101.p.ssafy.io/api/v1';

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
    const accesstoken = localStorage.getItem('accesstoken');

    if (accesstoken !== 'undefined') {
      config.headers.Authorization = accesstoken
        ? `Bearer ${accesstoken}`
        : null;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

export { authApi };
