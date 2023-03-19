import { useQuery } from '@tanstack/react-query';
import getQuizData from '../../api/getQuizApi';

export const useQuizData = (
  // 타입추론이 가능하여 타입을 적지않음 나중에 수정 필요
  region = 'defualt',
  culturalProperty = 'defualt',
) => {
  return useQuery(['quizData', region, culturalProperty], () =>
    getQuizData(region, culturalProperty),
  );
};

export default useQuizData;
