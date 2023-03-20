/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable default-case */
/* eslint-disable import/prefer-default-export */
import * as T from './types';

const initialState: T.State = 0;

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case '@quiz/setQuizCnt':
      return state + action.payload;
  }
  return state;
};
