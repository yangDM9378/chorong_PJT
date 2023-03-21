import type { Action } from 'redux';

export type State = number;
export type Option = string;

export type SetQuizCntAction = Action<'@quiz/setQuizCnt'> & {
  payload: State;
};
export type SetOptionAction = Action<'@quiz/setOption'> & {
  payload: Option;
};
export type Actions = SetQuizCntAction | SetOptionAction;
