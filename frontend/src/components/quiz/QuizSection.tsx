/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizProblem from './QuizProblem';
import * as C from '../../store/quiz';
import { AppState } from '../../store';
import { setSelectOption } from '../../store/quiz';
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
  // const quizDatas: Quiz[] = awit getQuiz();
  const quizDatas: Quiz[] = [
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

  const quizCnt = useSelector<AppState, C.State>(({ quiz }) => quiz);
  const opt = useSelector<AppState, C.Option>(({ option }) => option);
  const dispatch = useDispatch();
  // 더하는 부분 모달로 옮기기
  const quizCntPlus = useCallback(() => dispatch(C.quizCntPlus()), [dispatch]);

  const answerCheck = () => {
    dispatch(setSelectOption(''));

    if (opt === quizDatas[quizCnt].answer) {
      console.log(`잘했다 지원아 와~`);
    } else console.log('틀렸다 지성아 에휴');
  };

  // 맞을 시 정답입니다 리덕스에 correctCnt 생성 후 모달 틀릴시 정답이 아닙니다+해설

  const navigate = useNavigate();
  const goQuizCard = useCallback(() => {
    navigate('/quizscore');
  }, [navigate]);

  return (
    <div>
      {quizDatas.map((quizData, index) => (
        <QuizProblem
          key={quizData.question}
          quizData={quizData}
          index={index}
        />
      ))}
      {quizCnt < 3 ? (
        <button
          type="button"
          className="px-4 py-2 font-bold text-white rounded bg-mainred hover:bg-blue-700"
          onClick={answerCheck}
        >
          정답확인
        </button>
      ) : (
        <button type="button" onClick={goQuizCard}>
          결과보기
        </button>
      )}
      <button
        type="button"
        className="px-4 py-2 font-bold text-white rounded bg-mainred hover:bg-blue-700"
        onClick={quizCntPlus}
      >
        다음문제
      </button>
    </div>
  );
}
