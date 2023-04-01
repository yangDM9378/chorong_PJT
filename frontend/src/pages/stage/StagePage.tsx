import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import StageHeader from '../../components/stage/StageHeader';
import StageTheme from '../../components/stage/StageTheme';

export default function StagePage() {
  return (
    <S.MainPage>
      <StageHeader />
      <StageTheme />
    </S.MainPage>
  );
}

const S = {
  MainPage: styled.div`
    ${tw`bg-[#E5E5E5] h-[100vh]`}
  `,
};
