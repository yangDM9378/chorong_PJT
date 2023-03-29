import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CameraState = {
  img: Blob | undefined;
};

const initialState: CameraState = {
  img: undefined,
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setImg: (state, action: PayloadAction<Blob | undefined>) => {
      state.img = action.payload;
      console.log(state.img);
    },
  },
});

export const { setImg } = cameraSlice.actions;
export default cameraSlice.reducer;
