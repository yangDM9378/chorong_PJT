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
    // const token = localStorage.getItem('token');
    const token =
      'eyJyZWdEYXRlIjoxNjc5NjM3MjQ2Mjc2LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTm0iOiLslpHrj5nsnbQiLCJ1c2VySWQiOiJzc2FmeUBzc2FmeS5jb20iLCJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJleHAiOjE2Nzk2MzkwNDZ9.iNdAuCnG2mccnPKaH4WNUnbd4J2TFOU-XvpdtIPTn04';

    // if (token !== 'undefined') {
    //   config.headers.Authorization = token ? `Bearer ${token}` : null;
    // }
    config.headers.Authorization = token ? `Bearer ${token}` : null;

    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

export { authApi };
