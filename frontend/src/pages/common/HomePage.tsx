import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import HomeHeader from '../../components/home/HomeHeader';
import SignUpModal from '../../components/home/SignUpModal';

export default function HomePage() {
  const [flag, setFlag] = useState(false);

  function openSignUpModal() {
    return setFlag(true);
  }
  // function closeSignUpModal() {
  //   return setFlag(false);
  // }
  return (
    <div>
      <HomeHeader />;<button type="button">로그인하기</button>
      <button type="button" onClick={openSignUpModal}>
        계정 만들기
      </button>
      <Modal
        open={flag}
        onClose={() => {
          setFlag(false);
        }}
      >
        <SignUpModal
          onClose={() => {
            setFlag(false);
          }}
        />
      </Modal>
    </div>
  );
}
