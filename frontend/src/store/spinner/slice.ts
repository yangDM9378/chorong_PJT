import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Spinner } from '../../types/spinner';

const initialState: Spinner = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoadingState } = spinnerSlice.actions;
export default spinnerSlice.reducer;
