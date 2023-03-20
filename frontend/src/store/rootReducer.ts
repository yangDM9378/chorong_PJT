/* eslint-disable import/prefer-default-export */
// 단일 객체 export 할때 구조상 문제
import { combineReducers } from 'redux';
import * as Quiz from './quiz';

export const rootReducer = combineReducers({
  quiz: Quiz.reducer,
});
