import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../../components/common/home/Home';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      navigate('/stage');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div
      className="font-GmarketSansMedium w-[100vw] h-[100vh]"
      style={{
        backgroundImage: `url(/main/bg/bg0.png)`,
        backgroundSize: 'cover',
      }}
    >
      <Home />
    </div>
  );
}
