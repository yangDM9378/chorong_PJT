export interface UserData {
  resultCode: number;
  resultMsg: string;
  result: User; // result 속성 추가
}

interface User {
  userId: number;
  email: string;
  nickname: string;
}

export interface SignUpData {
  email: string;
  password: string;
  nickname: string;
}

export interface SignInData {
  email: string;
  password: string;
}
