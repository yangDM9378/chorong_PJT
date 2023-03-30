import styled from 'styled-components';
import tw from 'twin.macro';
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
  const goGame = () => {
    (window as any).Android.showGame('ssafy');
  };
  const goQuiz = () => {
    const region = culturalPropertydata?.result.culturalProperty.address;
    const nameKo = culturalPropertydata?.result.culturalProperty.nameKo;
    navigate(`/quiz/${region}/${nameKo}`);
  };
  const goCamera = () => {};

  return (
    <S.Container>
      <S.Button type="button" onClick={goGame}>
        게임
      </S.Button>
      <S.Button type="button" onClick={goQuiz}>
        퀴즈
      </S.Button>
      <S.Button type="button" onClick={goCamera}>
        촬영
      </S.Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`flex justify-center`}
  `,
  Button: styled.button`
    ${tw`my-[3vh] px-[5vw] rounded-[1vh] mx-[3vw] py-[1vh] text-[1.5vh] bg-[#d9d9d9]`}
  `,
};
