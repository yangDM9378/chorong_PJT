import axios from 'axios';

const getQuizData = async (region: string, culturalProperty: string) => {
  const { data } = await axios.get(
    `/api/v1/quiz/${region}/${culturalProperty}`,
  );
  return data;
};

export default getQuizData;
