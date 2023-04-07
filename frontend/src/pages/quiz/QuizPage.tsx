import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import QuizHeader from '../../components/quiz/QuizHeader';
import QuizSection from '../../components/quiz/QuizSection';

export default function QuizPage() {
  const navigate = useNavigate();
  const goCulturalpropertydetail = () => {
    navigate(
      `/culturalpropertydetail/${localStorage.getItem('culturalPropertyId')}`,
    );
  };
  return (
    <S.QuizRed>
      <IoIosArrowBack
        className="absolute w-[5vh] h-[5vh]"
        style={{ top: '2vh', left: '4vw', color: '#ffcdf3' }}
        onClick={goCulturalpropertydetail}
      />
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
