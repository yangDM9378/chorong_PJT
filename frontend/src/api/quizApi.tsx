import { authApi } from '../libs/axiosConfig';
import { QuizStar } from '../types/quiz';

export const getQuiz = async (region?: string, nameKo?: string) => {
  const { data } = await authApi.get(`quiz/${region}/${nameKo}`);
  return data;
};

export const setStar = async (data: QuizStar) => {
  await authApi.post('/cultural-properties/star/', data);
};
