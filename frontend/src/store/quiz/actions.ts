import type * as T from './types';

export const setQuizCnt = (payload: T.State): T.SetQuizCntAction => {
  return { type: '@quiz/setQuizCnt', payload };
};

export const quizCntPlus = () => setQuizCnt(1);

export const setSelectOption = (payload: T.Option): T.SetOptionAction => {
  return { type: '@quiz/setOption', payload };
};
