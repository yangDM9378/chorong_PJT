import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './slice';

const store = configureStore({
  reducer: {
    camera: cameraReducer,
  },
});

export default store;
