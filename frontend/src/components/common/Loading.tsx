import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function Loading() {
  return (
    <S.Background>
      <img
        src="/main/loading.gif"
        alt="스피너"
        style={{ width: '30vw', height: '20vh' }}
      />
      <S.LoadingText>로딩중</S.LoadingText>
    </S.Background>
  );
}

const S = {
  Background: styled.div`
    ${tw`absolute w-[100%] h-[100%] top-0 left-0 bg-white flex flex-col z-10 justify-center items-center`}
  `,
  LoadingText: styled.div`
    ${tw` text-center`}
  `,
};
