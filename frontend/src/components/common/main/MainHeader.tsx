/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../../api/userApi';

interface User {
  userId: number;
  email: string;
  nickname: string;
}

export default function MainTheme() {
  const [userMe, setUserMe] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getMe();
      if (response) {
        const { userId, email, nickname } = response.result;
        setUserMe({ userId, email, nickname });
      }
    };
    fetchUser();
  }, []);

  // 갤러리 클릭
  const navigate = useNavigate();
  const goGallery = () => {
    navigate('/culturalpropertydetail');
  };

  return (
    <div>
      {userMe ? (
        <div>
          <p>Nickname: {userMe.nickname}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <button type="button" onClick={goGallery}>
        Gallery
      </button>
    </div>
  );
}
