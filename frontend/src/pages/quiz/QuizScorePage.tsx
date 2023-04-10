import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import QuizScore from '../../components/quiz/QuizScore';
import QuizScoreButtons from '../../components/quiz/QuizScoreButtons';

export default function QuizScorePage() {
  return (
    <S.QuizScoreRed>
      <QuizScore />
      <QuizScoreButtons />
    </S.QuizScoreRed>
  );
}

const S = {
  QuizScoreRed: styled.div`
    ${tw`bg-quizbg w-[100vw] h-[100vh] py-[8vh] px-[4vw]`}
  `,
};
