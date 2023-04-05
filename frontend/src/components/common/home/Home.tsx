import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import SignInModalTest from './SignInModal';
import SignUpModal from './SignUpModal';
import CherryBlossom from './CherryBlossom';

export default function Home() {
  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('accesstoken');
  const openModalSignIn = () => {
    if (token) {
      navigate('/stage/');
    } else {
      setModalSignIn(true);
    }
  };
  const openModalSigUp = () => {
    setModalSignUp(true);
  };

  return (
    <S.Container style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <CherryBlossom />
      <S.Header>
        <div className="text-[5vh]">초롱따라</div>
        <div>초롱을 따라 길을 따라 </div>
      </S.Header>
      <SignInModalTest
        isOpen={modalSignIn}
        close={() => {
          setModalSignIn(false);
        }}
        setModalSignUp={setModalSignUp}
      />
      <SignUpModal
        isOpen={modalSignUp}
        close={() => {
          setModalSignUp(false);
        }}
      />

      <S.ButtonContainer>
        <button type="button" onClick={openModalSignIn}>
          들어가기
        </button>
        {/* <button type="button" onClick={openModalSigUp}>
          계정만들기
        </button> */}
      </S.ButtonContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`relative flex items-center justify-center w-[100%] h-[100%] `}
  `,
  Header: styled.div`
    ${tw` absolute flex flex-col text-white 	w-[100%] items-end pr-2`}
  `,
  HomeCarousel: styled.div`
    ${tw`fixed left-0 w-full h-full top-5`}
  `,
  ButtonContainer: styled.div`
    ${tw`absolute flex flex-col gap-4 px-2 py-3 top-[80vh] text-white w-[70%] rounded-lg border-4 border-subyellow bg-[rgba(0,0,0,0.3)]`}
  `,
};
