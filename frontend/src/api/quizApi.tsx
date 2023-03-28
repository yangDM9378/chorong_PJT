import { authApi } from '../libs/axiosConfig';

const getQuiz = async (region?: string, nameKo?: string) => {
  const { data } = await authApi.get(`quiz/${region}/${nameKo}`);
  console.log(data);
  return data;
};

export default getQuiz;
