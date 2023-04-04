import styled from 'styled-components';
import tw from 'twin.macro';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import isWithin50m from '../../libs/hooks/geolocation';

interface Coords {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface Props {
  coords: Coords;
}

export default function CulturalPropertyButtons({ coords }: Props) {
  // 페이지 이동
  const culturalPropertydata = useSelector<
    AppState,
    CulturalPropertyData | null
  >(({ culturalProperty }) => culturalProperty.value);
  const navigate = useNavigate();
  const goGame = () => {
    if (
      coords.latitude &&
      coords.longitude &&
      culturalPropertydata?.result.culturalProperty
    ) {
      const isTrue = isWithin50m(
        coords.latitude,
        coords.longitude,
        culturalPropertydata.result.culturalProperty.latitude,
        culturalPropertydata.result.culturalProperty.longitude,
      );
      if (isTrue) {
        (window as any).Android.showGame(
          `${localStorage.getItem('accesstoken')}
          ${localStorage.getItem('culturalPropertyId')}`,
        );
      } else {
        Swal.fire({
          text: `게임 진행을 위해 문화재 반경 50m 이내로 접근해주세요.`,
          confirmButtonColor: 'rgb(0, 170, 255)',
        });
      }
    } else {
      Swal.fire({
        text: 'GPS 확인중입니다. ',
        confirmButtonColor: 'rgb(0, 170, 255)',
      });
    }
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
