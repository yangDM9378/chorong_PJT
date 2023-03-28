// import styled from 'styled-components';
// import tw from 'twin.macro';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';

export default function CulturalPropertyHeader() {
  const culturalPropertydata = useSelector<
    AppState,
    CulturalPropertyData | null
  >(({ culturalProperty }) => culturalProperty.value);
  const starAr = culturalPropertydata?.result.starCountRes.starAr
    ? culturalPropertydata?.result.starCountRes.starAr
    : 0;

  const starPose = culturalPropertydata?.result.starCountRes.starAr
    ? culturalPropertydata?.result.starCountRes.starPose
    : 0;

  const starQuiz = culturalPropertydata?.result.starCountRes.starQuiz
    ? culturalPropertydata?.result.starCountRes.starQuiz
    : 0;

  const starCnt = starAr + starPose + starQuiz;

  return (
    <div>
      <div>{starCnt}</div>
      <img
        src={culturalPropertydata?.result.culturalProperty.image}
        alt={culturalPropertydata?.result.culturalProperty.image}
      />
      <div>{culturalPropertydata?.result.culturalProperty.nameKo}</div>
      <div>{culturalPropertydata?.result.culturalProperty.address}</div>
      <hr />
    </div>
  );
}
// const S = {
//   Container: styled.div`
//     ${tw`relative flex items-center justify-center`}
//   `,
// };
