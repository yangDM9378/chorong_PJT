import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import QuizProblem from './QuizProblem';
import * as C from '../../store/quiz';
// import useQuiz from '../../hooks/queries/useQuiz';
// import getQuiz from '../../api/getQuiz';

interface Quiz {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export default function QuizSection() {
  // //react-query 참고 용 -> quiz의 경우 클라이언트에서 서버데이터를 건들지 않으므로 필요 x
  // const { data: quizData, isLoading, error } = useQuiz();

  // useEffect(() => {
  //   if (quizData) {
  //     dispatch(saveQuizData(quizData));
  //   }
  // }, [dispatch, quizData]);

  // if (isLoading) {
  //   return <div>로딩중이야</div>;
  // }

  // if (error) {
  //   return <div> {error.message}</div>;
  // }

  // axios값 가져오기
  // const quizData: Quiz[] = awit getQuiz();
  const quizData: Quiz[] = [
    {
      question: '1번문제',
      options: ['1', '2', '3', '4'],
      answer: '3',
      explanation: '123123123',
    },
    {
      question: '2번문제',
      options: ['1', '2', '3', '4'],
      answer: '2',
      explanation: '1231121323123',
    },
    {
      question: '3번문제',
      options: ['1', '2', '3', '4'],
      answer: '1',
      explanation: '11111',
    },
  ];

  const dispatch = useDispatch();
  const quizCnt = useSelector<AppState, C.State>(({ quizcnt }) => quizcnt);
  const quizCntPlus = useCallback(() => dispatch(C.quizCntPlus()), [dispatch]);
  const quizCntMinus = useCallback(
    () => dispatch(C.quizCntMinus()),
    [dispatch],
  );
  return (
    <div>
      {quizCnt}
      {quizData.map((quiz, index) => (
        <QuizProblem key={quiz.question} quiz={quiz} index={index} />
      ))}
      <button
        type="button"
        className="px-4 py-2 font-bold text-white rounded bg-mainred hover:bg-blue-700"
        onClick={quizCntMinus}
      >
        이전 문제
      </button>
      <button
        type="button"
        className="px-4 py-2 font-bold text-white rounded bg-mainred hover:bg-blue-700"
        onClick={quizCntPlus}
      >
        다음 문제
      </button>
    </div>
  );
}
