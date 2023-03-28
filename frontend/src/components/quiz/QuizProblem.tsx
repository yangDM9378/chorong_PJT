/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { QuizState, setSelectOption } from '../../store/quiz/slice';
import { QuizProblemProps } from '../../types/quiz';

export default function QuizProblem({ quizData, index }: QuizProblemProps) {
  const quizCnt = useSelector<AppState, QuizState['quizCnt']>(
    (state) => state.quiz.quizCnt,
  );
  // 옵션 선택 내용
  const dispatch = useDispatch();
  const selectedOption = useSelector<AppState, string>(
    ({ quiz }) => quiz.selectOption,
  );
  const selectOption = (option: string) => {
    dispatch(setSelectOption(option));
  };
  // index값과 quizCnt 값이 같은 경우만 보이기
  if (index !== quizCnt) return null;
  return (
    <S.QuizProblemContainer key={quizData.question}>
      <S.QuizProblemQuestion>{quizData.question}</S.QuizProblemQuestion>
      {/* 문제 보기 뿌리기 */}
      {quizData.options.map((option) => (
        <div key={option}>
          <button
            type="button"
            className={`w-[85vw] h-[7vh] my-[1vh] text-[1.5vh] font-bold rounded-full text-white  ${
              // 선택된 옵션에 대해 CSS 표시
              option === selectedOption
                ? 'bg-[#707DAC]'
                : 'bg-[#D9D9D9] text-[#611d1d]'
            }`}
            onClick={() => {
              selectOption(option);
            }}
          >
            {option}
          </button>
        </div>
      ))}
      {/* <div>정답: {quizData.answer} </div>
      <div>해설: {quizData.explanation}</div> */}
    </S.QuizProblemContainer>
  );
}
const S = {
  QuizProblemContainer: styled.div`
    ${tw`flex flex-col items-center justify-center`}
  `,
  QuizProblemQuestion: styled.div`
    ${tw`h-[22vh] flex items-center text-[2vh]`}
  `,
};
