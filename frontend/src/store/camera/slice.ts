import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CameraState = {
  img: File | undefined;
};

const initialState: CameraState = {
  img: undefined,
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setImg: (state, action: PayloadAction<File | undefined>) => {
      state.img = action.payload;
      console.log(state.img);
    },
  },
});

export const { setImg } = cameraSlice.actions;
export default cameraSlice.reducer;
