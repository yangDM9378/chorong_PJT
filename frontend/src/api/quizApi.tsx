import { authApi } from '../libs/axiosConfig';
import { QuizStar } from '../types/quiz';

export const getQuiz = async (culturalPropertyId?: number) => {
  const {
    data: { result },
  } = await authApi.get(`quiz/${culturalPropertyId}`);
  return result;
};

export const setStar = async (data: QuizStar) => {
  await authApi.post('/cultural-properties/star/', data);
};
