import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthPage() {
  // const ACCESS_TOKEN = 'accessToken';
  const [token, setToken] = useState('');

  const [Error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('accesstoken', token);
      setToken('token');
      navigate('/main');
    }
    if (Error) {
      console.log(Error);
      navigate('/');
    }
  }, [token]);

  return <div>로그인 중</div>;
}
