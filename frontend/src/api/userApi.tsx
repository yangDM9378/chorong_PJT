/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { AxiosResponse } from 'axios';
import { authApi } from '../libs/axiosConfig';
import { SignInData, SignUpData, UserData } from '../types/auth';

// 회원가입
export async function signUp(data: SignUpData): Promise<void> {
  await authApi.post('/users/join', data);
}

// 로그인
export async function signIn(data: SignInData): Promise<string | null> {
  try {
    const response = await authApi.post('/users/login', data);
    return response.data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 사용자 정보
export async function getMe(): Promise<UserData | null> {
  try {
    const response: AxiosResponse<UserData> = await authApi.get('/users/');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
