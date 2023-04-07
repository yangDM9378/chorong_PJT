import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuizState = {
  quizCnt: number;
  selectOption: string;
  correctCnt: number;
};

const initialState: QuizState = {
  quizCnt: 0,
  selectOption: '',
  correctCnt: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizCnt: (state, action: PayloadAction<number>) => {
      state.quizCnt += action.payload;
    },
    setQuizCntInit: (state, action: PayloadAction<number>) => {
      state.quizCnt = action.payload;
    },
    setSelectOption: (state, action: PayloadAction<string>) => {
      state.selectOption = action.payload;
    },
    setCorrectCnt: (state, action: PayloadAction<number>) => {
      state.correctCnt += action.payload;
    },
    setCorrectCntInit: (state, action: PayloadAction<number>) => {
      state.correctCnt = action.payload;
    },
  },
});

export const {
  setQuizCnt,
  setSelectOption,
  setCorrectCnt,
  setQuizCntInit,
  setCorrectCntInit,
} = quizSlice.actions;
export default quizSlice.reducer;
