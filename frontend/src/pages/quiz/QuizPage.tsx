import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import QuizHeader from '../../components/quiz/QuizHeader';
import QuizSection from '../../components/quiz/QuizSection';

export default function QuizPage() {
  return (
    <S.QuizRed>
      <S.QuizGray>
        <S.QuizWhite>
          <QuizHeader />
          <QuizSection />
        </S.QuizWhite>
      </S.QuizGray>
    </S.QuizRed>
  );
}

const S = {
  QuizRed: styled.div`
    ${tw`bg-quizbg w-full h-full pt-[8vh]`}
  `,
  QuizGray: styled.div`
    ${tw`bg-[#D9D9D9] h-[100%] pt-[2vh] rounded-t-[2vh]`}
  `,
  QuizWhite: styled.div`
    ${tw`bg-white h-[100%] py-[1vh] rounded-t-[3vh]`}
  `,
};
