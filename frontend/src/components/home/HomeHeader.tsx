/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from '@mui/material/Modal';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

export default function HomeHeader() {
  const [logInFlag, setLogInFlag] = useState(false);
  const [signUpFlag, setSignUpFlag] = useState(false);

  function openLogInModal() {
    return setLogInFlag(true);
  }
  function closeLogInModal() {
    return setLogInFlag(false);
  }

  function openSignUpModal() {
    return setSignUpFlag(true);
  }
  function closeSignUpModal() {
    return setSignUpFlag(false);
  }
  return (
    <div>
      <S.GameHeader>
        <S.HeaderText>게임</S.HeaderText>
        <button type="button" onClick={openLogInModal}>
          로그인
        </button>
        <Modal open={logInFlag} onClose={closeLogInModal}>
          <div>
            <SignInModal onClose={closeLogInModal} />
          </div>
        </Modal>
        <button type="button" onClick={openSignUpModal}>
          계정 만들기
        </button>
        <Modal open={signUpFlag} onClose={closeSignUpModal}>
          <SignUpModal onClose={closeSignUpModal} />
        </Modal>
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
