import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import HomeCarousel from './HomeCarousel';
import SignInModalTest from './SignInModal';
import SignUpModal from './SignUpModal';

export default function Home() {
  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const openModalSignIn = () => {
    setModalSignIn(true);
  };
  const openModalSigUp = () => {
    setModalSignUp(true);
  };

  return (
    <S.Container>
      <SignInModalTest
        isOpen={modalSignIn}
        close={() => {
          setModalSignIn(false);
        }}
      />
      <SignUpModal
        isOpen={modalSignUp}
        close={() => {
          setModalSignUp(false);
        }}
      />
      <S.HomeCarousel>
        <HomeCarousel />s
      </S.HomeCarousel>
      <S.ButtonContainer>
        <button type="button" onClick={openModalSignIn}>
          로그인
        </button>
        <button type="button" onClick={openModalSigUp}>
          계정만들기
        </button>
      </S.ButtonContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`relative flex items-center justify-center`}
  `,
  HomeCarousel: styled.div`
    ${tw`fixed left-0 w-full h-full top-5`}
  `,
  ButtonContainer: styled.div`
    ${tw`absolute flex flex-col gap-4 p-4 top-[80vh]`}
  `,
};
