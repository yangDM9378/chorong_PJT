import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    cconsole.log(urlSearchParams);
    const token = urlSearchParams.get('token');
    console.log(token);
    if (token) {
      localStorage.setItem('accesstoken', token);
      navigate('/main');
    }
  }, []);

  return <div>로그인 중</div>;
}
