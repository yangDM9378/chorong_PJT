/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../api/userApi';

interface User {
  userId: number;
  email: string;
  nickname: string;
}

export default function StageHeader() {
  const [userMe, setUserMe] = useState<User | null>(null);

  useEffect(() => {
    const getMeData = async () => {
      const response = await getMe();
      if (response) {
        const { userId, email, nickname } = response.result;
        setUserMe({ userId, email, nickname });
      }
    };
    getMeData();
  }, []);

  // 갤러리 클릭
  const navigate = useNavigate();
  const goGallery = () => {
    navigate(`/gallery/${userMe?.userId}`);
  };

  return (
    <S.Container>
      {userMe ? (
        <div>
          <S.Nickname>{userMe.nickname}</S.Nickname>
          <S.Email>{userMe.email}</S.Email>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <S.Button>
        <button type="button" onClick={goGallery}>
          갤러리
        </button>
      </S.Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`flex justify-between items-center bg-white w-[90vw] h-[12vh] rounded-3xl mt-[3vh] px-[8vw]`}
  `,
  Nickname: styled.div`
    ${tw`text-[3vh] font-bold`}
  `,
  Email: styled.div`
    ${tw`text-[2vh]`}
  `,
  Button: styled.div`
    ${tw`w-[22vw] h-[6vh] flex justify-center items-center border-[326E6C] border-[1vw] rounded-lg`}
  `,
};
