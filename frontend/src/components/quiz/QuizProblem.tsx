/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import * as C from '../../store/quiz';
import { setSelectOption } from '../../store/quiz';

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
  const quizCnt = useSelector<AppState, C.State>(({ quiz }) => quiz);

  // selectoption 옵션 선택 내용 redux쪽으로 올리기
  const dispatch = useDispatch();

  const selectOption = (option: string) => {
    dispatch(setSelectOption(option));
  };

  const opt = useSelector<AppState, C.Option>(({ option }) => option);

  if (index !== quizCnt) return null;
  return (
    <div key={quizData.question}>
      <h3>{quizData.question}</h3>
      {quizData.options.map((option) => (
        <div key={option} className="m-2">
          <button
            type="button"
            className={`px-4 py-2 font-bold text-white rounded ${
              option === opt ? 'bg-blue-700' : 'bg-mainred hover:bg-blue-700'
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
