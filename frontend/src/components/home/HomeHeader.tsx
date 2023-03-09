/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function HomeHeader() {
  return (
    <div>
      <S.GameHeader>
        <S.HeaderText>게임</S.HeaderText>
      </S.GameHeader>
    </div>
  );
}

const S = {
  GameHeader: styled.div`
    ${tw`flex flex-col items-center justify-center h-48 m-3 border-4 border-black bg-slate-600`}
  `,
  HeaderText: styled.h1`
    ${tw`m-3 text-3xl text-center text-white border-4 border-black`}
  `,
};
