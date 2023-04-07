import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CulturalPropertyData } from '../../types/culturalpropertytype';

export type CulturalPropertyState = {
  value: CulturalPropertyData | null;
};

const initialState: CulturalPropertyState = {
  value: null,
};

const culturalPropertySlice = createSlice({
  name: 'culturalProperty',
  initialState,
  reducers: {
    setCulturalProperty: (
      state,
      action: PayloadAction<CulturalPropertyData>,
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCulturalProperty } = culturalPropertySlice.actions;
export default culturalPropertySlice.reducer;
