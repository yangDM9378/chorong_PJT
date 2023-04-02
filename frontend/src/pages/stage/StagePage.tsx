import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
// import StageHeader from '../../components/stage/StageHeader';
import StageTheme from '../../components/stage/StageTheme';
import Header from '../../components/common/profile/Header';

export default function StagePage() {
  return (
    <S.MainPage>
      <Header />
      <StageTheme />
    </S.MainPage>
  );
}

const S = {
  MainPage: styled.div`
    ${tw`bg-maingray h-[100vh]`}
  `,
};
