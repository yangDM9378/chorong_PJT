import axios from 'axios';
import { quizApi } from '../libs/axiosConfig';

const getQuizData = async (region: string, culturalProperty: string) => {
  const { data } = await quizApi.get(
    `/api/v1/quiz/${region}/${culturalProperty}`,
  );
  return data;
};

export default getQuizData;
