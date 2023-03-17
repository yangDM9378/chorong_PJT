import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CategoryRegionHeader() {
  const navigator = useNavigate();
  const { regionName } = useParams();

  const goBack = useCallback(() => {
    navigator(-1);
  }, [navigator]);
  return (
    <div>
      <div>{regionName}</div>

      <button type="button" onClick={goBack}>
        뒤로가기
      </button>
    </div>
  );
}
