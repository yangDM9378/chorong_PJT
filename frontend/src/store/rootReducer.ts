/* eslint-disable import/prefer-default-export */

import { combineReducers } from '@reduxjs/toolkit';
import quizReducer from './quiz/slice';
import cameraReducer from './camera/slice';
import culturalPropertyReducer from './culturalproperty/slice';
import spinnerReducer from './spinner/slice';

export const rootReducer = combineReducers({
  quiz: quizReducer,
  camera: cameraReducer,
  culturalProperty: culturalPropertyReducer,
  spinner: spinnerReducer,
});
