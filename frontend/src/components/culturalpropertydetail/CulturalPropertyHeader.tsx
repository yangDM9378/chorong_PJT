import styled from 'styled-components';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import CulturalPropertyStar from './CulturalPropertyStar';

export default function CulturalPropertyHeader() {
  const culturalPropertydata = useSelector<
    AppState,
    CulturalPropertyData | null
  >(({ culturalProperty }) => culturalProperty.value);

  const starAr = culturalPropertydata?.result.starCountRes.starAr ? 1 : 0;
  const starPose = culturalPropertydata?.result.starCountRes.starPose ? 1 : 0;
  const starQuiz = culturalPropertydata?.result.starCountRes.starQuiz ? 1 : 0;
  const starCnt = starAr + starPose + starQuiz;

  const goGps = () => {
    (window as any).Android.showGps(
      `${culturalPropertydata?.result.culturalProperty.latitude}|${culturalPropertydata?.result.culturalProperty.longitude}|${culturalPropertydata?.result.culturalProperty.nameKo}|poi`,
    );
  };

  return (
    <div className="h-[40%]">
      <S.Container
        style={{
          backgroundImage: `url(${culturalPropertydata?.result.culturalProperty.image})`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <CulturalPropertyStar starCnt={starCnt} />
          <S.InfoContainer>
            <S.Name>
              {culturalPropertydata?.result.culturalProperty.nameKo}
            </S.Name>
            <S.Address>
              {culturalPropertydata?.result.culturalProperty.address}
              <S.Position onClick={goGps}>
                <S.MapMark src="/detail/mapmarker2.png" alt="위치" />
                <div className="text-[1vh]">찾아가기</div>
              </S.Position>
            </S.Address>
          </S.InfoContainer>
        </div>
      </S.Container>
    </div>
  );
}
const S = {
  Container: styled.div`
    ${tw`relative w-full bg-cover rounded-b-[2vh] h-[95%]`}
  `,
  InfoContainer: styled.div`
    ${tw`absolute bottom-0 p-[2vh]`}
  `,
  Name: styled.div`
    ${tw`font-bold text-white text-[3vh] mb-[1vh] `}
  `,
  Address: styled.div`
    ${tw`font-semibold text-white text-[1.5vh] flex items-center`}
  `,
  Position: styled.div`
    ${tw`flex flex-col items-center justify-center`}
  `,
  MapMark: styled.img`
    ${tw`w-[5vh] h-[4vh] pl-[1vh]`}
  `,
};
