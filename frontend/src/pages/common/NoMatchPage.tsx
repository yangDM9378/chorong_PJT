import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoMatchPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="flex flex-col p-4">
      <p className="text-xl text-center">잘못된 접근이다</p>
      <button type="button" onClick={goBack}>
        뒤로가기
      </button>
    </div>
  );
}
