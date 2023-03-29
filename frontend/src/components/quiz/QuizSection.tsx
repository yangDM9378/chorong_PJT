/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
// import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
import QuizProblem from './QuizProblem';
import { AppState } from '../../store';
import { QuizState, setCorrectCnt } from '../../store/quiz/slice';
import QuizModal from './QuizModal';
import { Quiz } from '../../types/quiz';
// import getQuiz from '../../api/quizApi';

export default function QuizSection() {
  // const { region, nameKo } = useParams<{ region: string; nameKo: string }>();
  const dispatch = useDispatch();

  // if (!region || !nameKo) {
  //   return <div>region 또는 nameKo가 없어</div>;
  // }

  // const [quizDatas, setQuizDatas] = useState<Quiz[] | null>(null);
  // const { isLoading, isError, data } = useQuery<Quiz[], Error>(
  //   ['quizdatas', region, nameKo],
  //   () => getQuiz(region, nameKo),
  //   {
  //     onSuccess: (e) => {
  //       setQuizDatas(e);
  //     },
  //     staleTime: 300000,
  //   },
  // );

  // useEffect(() => {
  //   if (!data) {
  //     setQuizDatas(null);
  //   }
  // }, [data]);
  const quizDatas: Quiz[] = [
    {
      question: '광주 지산동 오층석탑은 몇 층으로 이루어져 있나?',
      options: ['3층', '4층', '5층', '6층'],
      answer: '5층',
      explanation: '광주 지산동 오층석탑은 이름 그대로 5층으로 이루어져 있다.',
    },
    {
      question: '광주 지산동 오층석탑의 건립 시기는?',
      options: ['신라시대', '고구려시대', '백제시대', '조선시대'],
      answer: '백제시대',
      explanation:
        '광주 지산동 오층석탑은 백제의 16대 왕인 선덕여왕 19년(544)에 건립되었다.',
    },
    {
      question: '광주 지산동 오층석탑은 몇 년도에 국보제 16호로 지정되었나?',
      options: ['1949년', '1962년', '1972년', '1983년'],
      answer: '1962년',
      explanation:
        '광주 지산동 오층석탑은 1962년 12월 20일 국보 16호로 지정되었다.',
    },
  ];
  const correctCntPlus = useCallback(() => {
    dispatch(setCorrectCnt(1));
  }, [dispatch]);

  const quizCnt = useSelector<AppState, QuizState['quizCnt']>(
    (state) => state.quiz.quizCnt,
  );
  const selectOption = useSelector<AppState, QuizState['selectOption']>(
    (state) => state.quiz.selectOption,
  );

  const [scoreModal, setscoreModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalExplanation, setModalExplanation] = useState('');

  const openModalClick = () => {
    if (quizDatas && selectOption === quizDatas[quizCnt].answer) {
      setscoreModal(true);
      correctCntPlus();
      setModalText('정답입니다!');
      setModalExplanation(quizDatas[quizCnt].explanation);
    } else {
      setscoreModal(true);
      setModalText('오답입니다!');
      setModalExplanation(quizDatas ? quizDatas[quizCnt].explanation : '');
    }
  };

  // useEffect(() => {
  //   setQuizDatas(null);
  // }, [region, nameKo]);

  // if (isLoading) {
  //   return <S.Loading>문제 로딩 중....</S.Loading>;
  // }
  // if (isError) {
  //   return (
  //     <div>
  //       <button type="button">오류 발생 다시 문제 불러오기</button>
  //     </div>
  //   );
  // }

  return (
    <S.QuizSectionContainer>
      {quizDatas && quizDatas.length > 0 && (
        <QuizModal
          isOpen={scoreModal}
          close={() => {
            setscoreModal(false);
          }}
          text={modalText}
          explanation={modalExplanation}
          answer={quizDatas[quizCnt].answer}
        />
      )}

      {quizDatas !== null &&
        quizDatas.map((quizData, index) => (
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
  Loading: styled.div`
    ${tw`flex justify-center items-center text-[3vh] w-full h-full`}
  `,
};
