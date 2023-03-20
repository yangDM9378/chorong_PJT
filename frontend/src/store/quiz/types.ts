import type { Action } from 'redux';

export type State = number;
export type SetQuizCntAction = Action<'@quiz/setQuizCnt'> & {
  payload: State;
};
export type Actions = SetQuizCntAction;
