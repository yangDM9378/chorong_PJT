/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
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
      question: '경상북도 경주에 있는 첨성대가 지어진 시기는 언제인가?',
      options: ['신라시대', '고구려시대', '백제시대', '경주시대'],
      answer: '신라시대',
      explanation:
        '경주에 있는 첨성대는 신라시대 왕궁인 금오산성의 일부로, 7세기에 지어졌다.',
    },
    {
      question: '첨성대에서 일제강점기 때까지 사용된 것은?',
      options: ['성곽', '저장고', '거주지', '별관'],
      answer: '성곽',
      explanation:
        '첨성대는 신라시대 왕궁인 금오산성의 방어시설이자 호위구조물로 사용되었다. 일제강점기에는 일본인들이 첨성대를 채굴하여 내부구조와 고분벽, 그리고 지층까지 파괴해 놓았다.',
    },
    {
      question: '첨성대의 높이는 얼마인가?',
      options: ['25m', '30m', '35m', '40m'],
      answer: '30m',
      explanation:
        '첨성대는 5층의 높이로, 30미터가 넘는 높이를 가지고 있다. 특히 한옥처럼 나무와 대나무, 딱좋은 흙 등 자연의 재료만을 이용하여 만들어졌기 때문에 그 높이는 작품이라고 불리울 정도다.',
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
  const [modalExplanation, setModalExplanation] = useState('');
  const openModalClick = () => {
    // 정답일때 아닐때
    if (selectOption === quizDatas[quizCnt].answer) {
      setscoreModal(true);
      correctCntPlus();
      setModalText('정답입니다');
      setModalExplanation(quizDatas[quizCnt].explanation);
    } else {
      setscoreModal(true);
      setModalText('오답입니다');
      setModalExplanation(quizDatas[quizCnt].explanation);
    }
  };

  return (
    <S.QuizSectionContainer>
      {/* 모달부분 */}
      <QuizModal
        isOpen={scoreModal}
        close={() => {
          setscoreModal(false);
        }}
        text={modalText}
        explanation={modalExplanation}
        answer={quizDatas[quizCnt].answer}
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
        className={`w-[85vw] h-[7vh] my-[3vh] font-lights text-[2vh] rounded-full bg-mainred text-white ${
          // 선택된 옵션에 대해 CSS 표시
          selectOption === '' ? 'opacity-30 cursor-not-allowed' : ''
        }`}
        onClick={openModalClick}
        disabled={!selectOption}
      >
        정답확인
      </button>
    </S.QuizSectionContainer>
  );
}

const S = {
  QuizSectionContainer: styled.div`
    ${tw`mx-[3vh] mt-[1vh] h-[75vh] flex flex-col items-center`}
  `,
};
