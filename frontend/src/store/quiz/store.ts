import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slice';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default store;
