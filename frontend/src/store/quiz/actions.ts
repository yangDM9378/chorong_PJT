import type * as T from './types';

export const setQuizCnt = (payload: T.State): T.SetQuizCntAction => {
  return { type: '@quiz/setQuizCnt', payload };
};

export const quizCntPlus = () => setQuizCnt(1);

export const setSelectOption = (payload: T.Option): T.SetOptionAction => {
  return { type: '@quiz/setOption', payload };
};

export const setCorrectCnt = (payload: T.CorrectCnt): T.SetCorrectCntAction => {
  return { type: '@quiz/setCorrectCnt', payload };
};

export const correctCntPlus = () => setCorrectCnt(1);
