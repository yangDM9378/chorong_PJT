import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import MainHeader from '../../components/common/main/MainHeader';
import MainTheme from '../../components/common/main/MainTheme';

export default function MainPage() {
  return (
    <S.MainPage>
      <MainHeader />
      <MainTheme />
    </S.MainPage>
  );
}

const S = {
  MainPage: styled.div`
    ${tw`bg-[#E5E5E5] flex flex-col items-center w-full h-[100vh]`}
  `,
};
