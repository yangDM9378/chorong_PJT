/* eslint-disable import/prefer-default-export */
import Swal from 'sweetalert2';
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
    const refreshtoken = localStorage.getItem('refreshtoken');
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

authApi.interceptors.response.use(
  async (response) => {
    if (response.data.code === 'G006') {
      const refreshtoken = localStorage.getItem('refreshtoken');
      // 리프레시 토큰이 정상이면 으로 코드 수정해야함 리프레시토큰 유효성 검사하는 방법을 적용해야함
      if (refreshtoken) {
        const reissueResponse = await axios.post('/auth/reissue', {
          refreshToken: refreshtoken,
        });
        // 리프레시 토큰이 잘못됐었을때 처리 로직 local에서 로컬 값 다 비우고 main 페이지로이동
        if (reissueResponse.data.code === 'G999') {
          localStorage.removeItem('accesstoken');
          localStorage.removeItem('refreshtoken');
          window.location.href = '/';
        } else {
          console.log('리프레시로 엑세스토큰 재발급 완료');
          localStorage.setItem(
            'accesstoken',
            reissueResponse.data.result.accessToken,
          );
          localStorage.setItem(
            'refreshtoken',
            reissueResponse.data.result.refreshToken,
          );
        }
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { authApi };
