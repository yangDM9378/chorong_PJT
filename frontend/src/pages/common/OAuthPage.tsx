/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');
    if (token) {
      localStorage.setItem('accesstoken', token);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/stage');
    }
  }, [token]);

  return <div>로그인 중</div>;
}
