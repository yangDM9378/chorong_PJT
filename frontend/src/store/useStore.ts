/* eslint-disable import/prefer-default-export */
// 함수가 하나일때 export default  를 해야함
import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { rootReducer } from './rootReducer';

const initializeStore = () => {
  const store = configureStore({ reducer: rootReducer, middleware: [] });
  return store;
};

export function useStore() {
  const store = useMemo(() => initializeStore(), []);
  return store;
}
