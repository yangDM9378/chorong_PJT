import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';
import { BiLock } from '@react-icons/all-files/bi/BiLock';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import CulturalPorpertyGallary from './CulturalPropertyGallary';

const initialTab = 1;

export default function CulturalPropertyDescription() {
  const [tabNumber, setTabNumber] = useState(initialTab);
  const changeTab = (no: number) => {
    setTabNumber(no);
  };
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
      <S.ButtonContainer>
        <S.Button type="button" onClick={() => changeTab(1)}>
          tab1
        </S.Button>
        <S.Button type="button" onClick={() => changeTab(2)}>
          tab2
        </S.Button>
        <S.Button type="button" onClick={() => changeTab(3)}>
          갤러리
        </S.Button>
      </S.ButtonContainer>
      <S.DescriptionContainer>
        {tabNumber === 1 && (
          <S.Description>
            {culturalPropertydata?.result.culturalProperty.description}
          </S.Description>
        )}
        {/* {starCnt < 0 ? (
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
      )} */}
        {tabNumber === 2 &&
          (starCnt > 0 ? (
            <S.Description>
              {culturalPropertydata?.result.culturalProperty.hiddenDescription}
            </S.Description>
          ) : (
            <S.Box>
              <S.HiddenDescription>
                {
                  culturalPropertydata?.result.culturalProperty
                    .hiddenDescription
                }
              </S.HiddenDescription>
              <S.Lock>
                <BiLock className="w-[5vh] h-[5vh]" />
              </S.Lock>
            </S.Box>
          ))}
        {tabNumber === 3 && <CulturalPorpertyGallary tabNumber={tabNumber} />}
      </S.DescriptionContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw` w-full pt-[1vh] px-[1vh]`}
  `,
  DescriptionContainer: styled.div`
    ${tw`w-full bg-white p-[1vh] rounded-b-[1vh] `}
  `,
  Description: styled.div`
    ${tw`text-[2vh] `}
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
  ButtonContainer: styled.div`
    ${tw` rounded-t-[1vh] grid grid-cols-3`}
  `,
  Button: styled.button`
    ${tw`p-[1vh] bg-white rounded-t-[1vh]`}
  `,
};
