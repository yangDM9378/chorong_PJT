/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from '@mui/material/Modal';
import SignInModal from './SignInModal';

export default function HomeHeader() {
  const [loginFlag, setLoginFlag] = useState(false);
  function openLoginModal() {
    return setLoginFlag(true);
  }
  function closeLoginModal() {
    return setLoginFlag(false);
  }
  return (
    <div>
      <S.GameHeader>
        <S.HeaderText>게임</S.HeaderText>
        <button type="button" onClick={openLoginModal}>
          로그인
        </button>
        <Modal open={loginFlag} onClose={closeLoginModal}>
          <div>
            <SignInModal onClose={closeLoginModal} />
          </div>
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
