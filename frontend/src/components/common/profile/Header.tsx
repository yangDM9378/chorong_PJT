import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import Swal from 'sweetalert2';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiPhotoAlbum } from '@react-icons/all-files/bi/BiPhotoAlbum';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { BiLogOut } from '@react-icons/all-files/bi/BiLogOut';
import { getMe } from '../../../api/userApi';

const drift = keyframes`
  from { transform: rotate(0deg); }
  from { transform: rotate(360deg); }
`;
const Box = styled.div`
  height: 90%;
  border-radius: 5px;
  box-shadow: 0 2px 30px rgba(black, 0.2);
  background: lighten(#f0f4c3, 10%);
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  &::after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(#e8a, 1),
      rgba(#def, 0) 80%,
      rgba(white, 0.5)
    );
    z-index: 11;
    transform: translate3d(0, 0, 0);
  }
`;
const Wave = styled.div`
  opacity: 0.4;
  position: absolute;
  top: 6.5vh;
  left: 31vh;
  background: #0af;
  width: 56vh;
  height: 56vh;
  margin-left: -250px;
  margin-top: -250px;
  transform-origin: 50% 48%;
  border-radius: 43%;
  animation: ${drift} 3000ms infinite linear;
  &.-three {
    animation: ${drift} 5000ms infinite linear;
  }
  &.-two {
    animation: ${drift} 7000ms infinite linear;
    opacity: 0.1;
    background: yellow;
  }
`;

interface User {
  userId: number;
  email: string;
  nickname: string;
}

export default function Header() {
  const [userMe, setUserMe] = useState<User | null>(null);

  useEffect(() => {
    const getMeData = async () => {
      const response = await getMe();
      if (response?.result) {
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
  const logOut = () => {
    Swal.fire({
      text: '로그아웃 되었습니다.',
      confirmButtonColor: 'rgb(0, 170, 255)',
    }).then(() => {
      localStorage.removeItem('accesstoken');
      localStorage.removeItem('refreshtoken');
      navigate('/');
    });
  };
  // 갤러리 들어갔을때랑 stage일때 컴포넌트 다르게 띄우기
  const { pathname } = useLocation();
  const goStage = () => {
    navigate('/stage/');
  };
  return (
    <S.Container>
      {/* <S.BackImage
        style={{
          transform: 'translate3d(0, 0, 0)',
          background: 'lighten(#f0f4c3, 10%)',
        }}
      > */}
      <Box>
        <Wave />
        <Wave className="-three" />
        <Wave className="-two" />
      </Box>
      {/* </S.BackImage> */}
      <S.NameCircle style={{ top: '12vh', left: '-5vh' }}>
        <S.TextBox>
          <div className="text-[2.4vh]">{userMe?.nickname}</div>
          {/* <div className="text-[1.2vh]">{userMe?.email}</div> */}
        </S.TextBox>
      </S.NameCircle>
      <S.GalleryButton
        style={{
          top: '12vh',
          left: '10vh',
          border: 'solid 1.5vh #fbfcb9be',
          width: '8vh',
          height: '8vh',
        }}
        onClick={goGallery}
      >
        <BiPhotoAlbum />
      </S.GalleryButton>
      {pathname === '/stage/' && (
        <BiLogOut
          className="absolute w-[5vh] h-[5vh]"
          style={{ top: '2vh', right: '6vw', color: '#fbfcb9be' }}
          onClick={logOut}
        />
      )}
      {pathname !== `/stage/` && (
        <IoIosArrowBack
          className="absolute w-[5vh] h-[5vh]"
          style={{ top: '2vh', left: '4vw', color: '#fbfcb9be' }}
          onClick={goStage}
        />
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`relative h-[35%] `}
  `,
  BackImage: styled.div`
    ${tw`h-[90%] relative overflow-hidden `}
  `,
  NameCircle: styled.div`
    ${tw`absolute rounded-[100%] bg-[rgba(255, 205, 243, 0.9);] w-[20vh] h-[20vh] flex flex-col items-center justify-center text-white  `}
  `,
  TextBox: styled.div`
    ${tw`w-[60%] h-[80%] flex flex-col items-start justify-center ml-[4vh] p-[1.5vh]`}
  `,
  GalleryButton: styled.div`
    ${tw`absolute rounded-[100%] bg-white  flex items-center justify-center`}
  `,
};
