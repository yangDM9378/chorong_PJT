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
    (window as any).Android.showGame(
      `${localStorage.getItem('accesstoken')}
      ${localStorage.getItem('culturalPropertyId')}`,
    );
  };
  const goQuiz = () => {
    const region = culturalPropertydata?.result.culturalProperty.address;
    const nameKo = culturalPropertydata?.result.culturalProperty.nameKo;
    navigate(`/quiz/${region}/${nameKo}`);
  };
  const goCamera = () => {
    navigate(`/camera`);
  };
  return (
    <S.Container>
      <S.Button type="button" onClick={goGame}>
        게임
        {culturalPropertydata?.result.starCountRes.starAr === 1 ? (
          <S.Stamp
            src="/detail/stamp.png"
            alt="도장"
            style={{ top: '-54%', left: '66%' }}
          />
        ) : (
          ''
        )}
      </S.Button>
      <S.Button type="button" onClick={goQuiz}>
        퀴즈
        {culturalPropertydata?.result.starCountRes.starQuiz === 1 ? (
          <S.Stamp
            src="/detail/stamp.png"
            alt="도장"
            style={{ top: '-54%', left: '66%' }}
          />
        ) : (
          ''
        )}
      </S.Button>
      <S.Button type="button" onClick={goCamera}>
        촬영
        {culturalPropertydata?.result.starCountRes.starPose === 1 ? (
          <S.Stamp
            src="/detail/stamp.png"
            alt="도장"
            style={{ top: '-54%', left: '66%' }}
          />
        ) : (
          ''
        )}
      </S.Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`grid grid-cols-3 m-auto w-[95%] h-[10%]`}
  `,
  Button: styled.button`
    ${tw`my-[2vh] px-[2vh] rounded-[1vh] mx-[2vh] py-[1vh] text-[1.7vh] bg-subblue text-white relative`}
  `,
  Stamp: styled.img`
    ${tw`absolute w-[6vh] h-[7vh] `}
  `,
};
