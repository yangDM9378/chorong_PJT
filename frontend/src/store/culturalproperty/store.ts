import { configureStore } from '@reduxjs/toolkit';
import culturalPropertySlice from './slice';

const store = configureStore({
  reducer: {
    culturalProperty: culturalPropertySlice,
  },
});

export default store;
