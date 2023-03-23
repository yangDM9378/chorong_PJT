/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuizProblem from './QuizProblem';
import { AppState } from '../../store';
import { QuizState, setCorrectCnt } from '../../store/quiz/slice';
import QuizModal from './QuizModal';

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
      options: ['1]3', '2', '312', '4'],
      answer: '2',
      explanation: '1231121323123',
    },
    {
      question: '3번문제',
      options: ['1', '2', '321321', '4'],
      answer: '1',
      explanation: '11111',
    },
  ];
  const quizCnt = useSelector<AppState, QuizState['quizCnt']>(
    (state) => state.quiz.quizCnt,
  );
  const selectOption = useSelector<AppState, QuizState['selectOption']>(
    (state) => state.quiz.selectOption,
  );

  const dispatch = useDispatch();

  const correctCntPlus = useCallback(() => {
    dispatch(setCorrectCnt(1));
  }, [dispatch]);

  // 모달부분
  const [scoreModal, setscoreModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const openModalClick = () => {
    // 정답일때 아닐때
    if (selectOption === quizDatas[quizCnt].answer) {
      setscoreModal(true);
      correctCntPlus();
      setModalText('맞았당');
    } else {
      setscoreModal(true);
      setModalText('바보자슥아');
    }
  };

  return (
    <div>
      {/* 모달부분 */}
      <QuizModal
        isOpen={scoreModal}
        close={() => {
          setscoreModal(false);
        }}
        text={modalText}
      />
      {/* 전체 데이터를 넣기 */}
      {quizDatas.map((quizData, index) => (
        <QuizProblem
          key={quizData.question}
          quizData={quizData}
          index={index}
        />
      ))}
      {/* 정답인지 아닌지 모달 띄우기 */}
      <button
        type="button"
        className={`px-4 py-2 font-bold text-white rounded bg-mainred hover:bg-blue-700 ${
          // 선택된 옵션에 대해 CSS 표시
          selectOption === '' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={openModalClick}
        disabled={!selectOption}
      >
        정답확인
      </button>
    </div>
  );
}
