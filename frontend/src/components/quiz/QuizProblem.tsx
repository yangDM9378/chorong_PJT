/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { QuizState, setSelectOption } from '../../store/quiz/slice';

interface Quiz {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizProblemProps {
  quizData: Quiz;
  index: number;
}

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
    <div key={quizData.question}>
      <h3>{quizData.question}</h3>
      {/* 문제 보기 뿌리기 */}
      {quizData.options.map((option) => (
        <div key={option} className="m-2">
          <button
            type="button"
            className={`px-4 py-2 font-bold text-white rounded ${
              // 선택된 옵션에 대해 CSS 표시
              option === selectedOption
                ? 'bg-blue-700'
                : 'bg-mainred hover:bg-blue-700'
            }`}
            onClick={() => {
              selectOption(option);
            }}
          >
            {option}
          </button>
        </div>
      ))}
      <div>정답: {quizData.answer} </div>
      <div>해설: {quizData.explanation}</div>
    </div>
  );
}
