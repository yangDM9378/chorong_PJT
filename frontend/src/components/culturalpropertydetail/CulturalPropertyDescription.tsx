import styled from 'styled-components';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';
import { BiLock } from '@react-icons/all-files/bi/BiLock';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';

export default function CulturalPropertyDescription() {
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
    <S.Container>
      <S.Description>
        {culturalPropertydata?.result.culturalProperty.description}
      </S.Description>

      {starCnt < 0 ? (
        <S.Description>
          {culturalPropertydata?.result.culturalProperty.hiddenDescription}
        </S.Description>
      ) : (
        <S.Box>
          <S.HiddenDescription>
            {culturalPropertydata?.result.culturalProperty.hiddenDescription}
          </S.HiddenDescription>
          <S.Lock>
            <BiLock className="w-[5vh] h-[5vh]" />
          </S.Lock>
        </S.Box>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw` w-full rounded-[3vh] bg-white`}
  `,
  Description: styled.div`
    ${tw`text-[2vh] pt-[3vh] px-[3vh]`}
  `,
  Box: styled.div`
    ${tw`relative py-[3vh] px-[3vh]`}
  `,
  HiddenDescription: styled.div`
    ${tw`text-[2vh] `}
    color: transparent;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  `,
  Lock: styled.div`
    ${tw`absolute inset-0 flex items-center justify-center`}
  `,
};
