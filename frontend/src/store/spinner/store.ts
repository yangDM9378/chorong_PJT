import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from './slice';

const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
  },
});

export default store;
