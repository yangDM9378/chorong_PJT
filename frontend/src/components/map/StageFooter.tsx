import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { GwangjustageProps } from '../../types/map';
import CulturalPropertyStar from '../culturalpropertydetail/CulturalPropertyStar';

export default function StageFooter(props: GwangjustageProps) {
  const { mapDatas } = props;
  const location = useLocation();
  const { stageInfo } = location.state;

  return (
    <div>
      <S.FooterContainer>
        <button type="button" onClick={() => console.log(mapDatas)}>
          1111
        </button>
        <S.FooterBox>
          <S.StageName>
            {stageInfo[1]}
            <S.StageNameLine />
          </S.StageName>
          <S.StageDescript>{stageInfo[2]}</S.StageDescript>
          <S.CulturalProperty>
            {mapDatas?.map((mapData, index) => (
              <div key={mapData.culturalPropertyId}>
                <CulturalPropertyStar starCnt={mapData.starCount} />
                <div>이미지</div>
                <div>
                  {index + 1}. {mapData.nameKo}
                </div>
              </div>
            ))}
          </S.CulturalProperty>
        </S.FooterBox>
      </S.FooterContainer>
    </div>
  );
}

const S = {
  FooterContainer: styled.div`
    ${tw` bg-mainred rounded-t-[3vh] pt-[3vh]`}
  `,
  FooterBox: styled.div`
    ${tw`min-h-[40vh] w-full bg-white rounded-t-[3vh]`}
  `,
  StageName: styled.div`
    ${tw`pt-[3vh] px-[3vw] text-[3vh] font-bold`}
  `,
  StageNameLine: styled.hr`
    ${tw``}
  `,
  StageDescript: styled.div`
    ${tw`mx-[3vw] mt-[2vh] text-[2vh]`}
  `,
  CulturalProperty: styled.div`
    ${tw`mx-[3vw] mt-[3vh] h-[30vh] flex overflow-y-scroll whitespace-nowrap`}
  `,
};
