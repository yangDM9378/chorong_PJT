/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
// import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useQuery } from '@tanstack/react-query';
import QuizProblem from './QuizProblem';
import { AppState } from '../../store';
import {
  QuizState,
  setCorrectCnt,
  setQuizCntInit,
  setCorrectCntInit,
} from '../../store/quiz/slice';
import QuizModal from './QuizModal';
import { Quiz } from '../../types/quiz';
import { getQuiz } from '../../api/quizApi';

export default function QuizSection() {
  const dispatch = useDispatch();

  const [quizDatas, setQuizDatas] = useState<Quiz[] | null>(null);
  const { data } = useQuery<Quiz[], Error>(
    ['quizdatas', localStorage.getItem('culturalPropertyId')],
    () => getQuiz(Number(localStorage.getItem('culturalPropertyId'))),
    {
      onSuccess: (e) => {
        setQuizDatas(e);
      },
      // staleTime: 300000,
    },
  );

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    dispatch(setQuizCntInit(0));
    dispatch(setCorrectCntInit(0));
  }, []);

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

      {Array.isArray(quizDatas) &&
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
