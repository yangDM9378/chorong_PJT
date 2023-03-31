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
    ${tw`font-bold text-white text-[3vh] mb-[1vh]`}
  `,
  Address: styled.div`
    ${tw`font-semibold text-white text-[1.5vh]`}
  `,
};
