/* eslint-disable import/prefer-default-export */

import { combineReducers } from '@reduxjs/toolkit';
import quizReducer from './quiz/slice';
import cameraReducer from './camera/slice';

export const rootReducer = combineReducers({
  quiz: quizReducer,
  camera: cameraReducer,
});
