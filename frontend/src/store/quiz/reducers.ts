/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable default-case */
/* eslint-disable import/prefer-default-export */
import * as T from './types';

const initialState: T.State = 0;

export const cntReducer = (
  state: T.State = initialState,
  action: T.Actions,
) => {
  switch (action.type) {
    case '@quiz/setQuizCnt':
      return state + action.payload;
  }
  return state;
};

const initialOption: T.Option = '';

export const optionReducer = (
  option: T.Option = initialOption,
  action: T.Actions,
) => {
  switch (action.type) {
    case '@quiz/setOption':
      return action.payload;
  }
  return option;
};

const initialCorrectCnt: T.CorrectCnt = 0;

export const correctCntReducer = (
  correctCnt: T.CorrectCnt = initialCorrectCnt,
  action: T.Actions,
) => {
  switch (action.type) {
    case '@quiz/setCorrectCnt':
      return correctCnt + action.payload;
  }
  return correctCnt;
};
