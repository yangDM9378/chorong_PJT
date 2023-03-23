import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CameraState = {
  img: string | undefined;
};

const initialState: CameraState = {
  img: '',
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setImg: (state, action: PayloadAction<string | undefined>) => {
      state.img = action.payload;
      console.log(state.img);
    },
  },
});

export const { setImg } = cameraSlice.actions;
export default cameraSlice.reducer;
