import { authApi } from '../libs/axiosConfig';

const getQuiz = async (region: string, culturalProperty: string) => {
  const { data } = await authApi.get(
    `/api/v1/quiz/${region}/${culturalProperty}`,
  );
  return data;
};

export default getQuiz;
