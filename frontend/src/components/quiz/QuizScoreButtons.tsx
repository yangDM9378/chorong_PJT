/* eslint-disable no-console */
import tw from 'twin.macro';
import styled from 'styled-components';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import { QuizState, setCorrectCnt } from '../../store/quiz/slice';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import { setStar } from '../../api/quizApi';

export default function QuizScoreButtons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 맞은 갯수 초기화시 사용
  const correctCnt = useSelector<AppState, QuizState['correctCnt']>(
    (state) => state.quiz.correctCnt,
  );
  // 퀴즈페이지 처음으로 가기
  const goQuiz = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  // 맞은 갯수 초기화 하기
  const correctCntInit = useCallback(() => {
    dispatch(setCorrectCnt(-correctCnt));
  }, [dispatch]);

  const returnSolveClick = () => {
    correctCntInit();
    goQuiz();
  };

  // 퀴즈끝내고 갤러리로 이동
  const culturalPropertydate = useSelector<
    AppState,
    CulturalPropertyData | null
  >(({ culturalProperty }) => culturalProperty.value);

  const goCulturalPropertyDetail = useCallback(() => {
    navigate(
      `/culturalpropertydetail/${culturalPropertydate?.result.culturalProperty.culturalPropertyId}`,
    );
  }, [navigate]);

  const quizFinish = async () => {
    correctCntInit();
    if (
      culturalPropertydate?.result.starCountRes.starQuiz === 0 &&
      correctCnt >= 2
    ) {
      try {
        const starData = {
          culturalPropertyId:
            culturalPropertydate.result.culturalProperty.culturalPropertyId,
          starType: 'quiz',
        };

        await setStar(starData);
      } catch (error) {
        console.error('Error in setting star:', error);
      }
    }

    await goCulturalPropertyDetail();
  };

  return (
    <S.QuizScoreButtons>
      <S.QuizScoreButton type="button" onClick={returnSolveClick}>
        다시풀기
      </S.QuizScoreButton>
      <S.QuizScoreButton type="button" onClick={quizFinish}>
        갤러리
      </S.QuizScoreButton>
    </S.QuizScoreButtons>
  );
}

const S = {
  QuizScoreButtons: styled.div`
    ${tw`flex items-center justify-between h-[15vh]`}
  `,
  QuizScoreButton: styled.button`
    ${tw`w-[45vw] h-[6vh] bg-[#5C1F1F] rounded-full text-white text-[2vh]`}
  `,
};
