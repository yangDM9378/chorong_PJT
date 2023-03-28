import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';

export default function CulturalPropertyButtons() {
  // 페이지 이동
  const culturalPropertydata = useSelector<
    AppState,
    CulturalPropertyData | null
  >(({ culturalProperty }) => culturalProperty.value);

  const navigate = useNavigate();
  const goGame = () => {};
  const goQuiz = () => {
    const region = culturalPropertydata?.result.culturalProperty.address;
    const nameKo = culturalPropertydata?.result.culturalProperty.nameKo;
    navigate(`/quiz/${region}/${nameKo}`);
  };
  const goCamera = () => {};

  return (
    <div>
      <button type="button" onClick={goGame}>
        게임
      </button>
      <button type="button" onClick={goQuiz}>
        퀴즈
      </button>
      <button type="button" onClick={goCamera}>
        촬영
      </button>
    </div>
  );
}
