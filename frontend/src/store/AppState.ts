import * as Quiz from './quiz';

export type AppState = {
  quiz: Quiz.State;
  option: Quiz.Option;
  correctCnt: Quiz.CorrectCnt;
};
