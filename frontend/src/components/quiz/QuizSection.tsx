/* eslint-disable no-console */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import QuizProblem from './QuizProblem';
import { AppState } from '../../store';
import { QuizState } from '../../store/quiz/slice';
import QuizModal from './QuizModal';

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

  // const dispatch = useDispatch();

  // const quizCntPlus = useCallback(() => {
  //   dispatch(setQuizCnt(1));
  // }, [dispatch]);

  // const navigate = useNavigate();
  // const goQuizCard = useCallback(() => {
  //   navigate('/quizscore');
  // }, [navigate]);

  // 모달부분
  const [modalCorrect, setModalCorrect] = useState(false);
  const [modalWrong, setModalWrong] = useState(false);
  const openModalClick = () => {
    if (selectOption === quizDatas[quizCnt].answer) {
      setModalCorrect(true);
    } else {
      setModalWrong(true);
    }
  };

  return (
    <div>
      {quizDatas.map((quizData, index) => (
        <QuizProblem
          key={quizData.question}
          quizData={quizData}
          index={index}
        />
      ))}

      {/* 모달부분 */}
      <QuizModal
        isOpen={modalCorrect}
        close={() => {
          setModalCorrect(false);
        }}
        text="맞았습니다"
      />

      <QuizModal
        isOpen={modalWrong}
        close={() => {
          setModalWrong(false);
        }}
        text="틀렸어요"
      />
      <button
        type="button"
        className="px-4 py-2 font-bold text-white rounded bg-mainred hover:bg-blue-700"
        onClick={openModalClick}
      >
        정답확인
      </button>
    </div>
  );
}
