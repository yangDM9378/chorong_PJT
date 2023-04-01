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
          <div>{userMe.nickname}</div>
          <div>{userMe.email}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div>
        <button type="button" onClick={goGallery}>
          갤러리
        </button>
      </div>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-[35vh] bg-white w-full`}
  `,
};
