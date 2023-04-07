import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { StageProps } from '../../types/map';
import MapStar from './MapStar';

export default function StageFooter(props: StageProps) {
  const { mapDatas } = props;
  const location = useLocation();
  const { stageInfo } = location.state;
  const navigate = useNavigate();
  return (
    <div>
      <S.FooterContainer>
        <S.FooterBox>
          <S.StageName>
            {stageInfo[1]}
            <S.StageNameLine />
          </S.StageName>
          <S.StageDescript>{stageInfo[2]}</S.StageDescript>
          <S.InfoBox>
            {mapDatas?.map((mapData, index) => (
              <S.CulturalProperty
                key={mapData.culturalPropertyId}
                onClick={() => {
                  navigate(
                    `/culturalpropertydetail/${mapData.culturalPropertyId}`,
                  );
                }}
              >
                <div>
                  {index + 1}. {mapData.nameKo}
                </div>
                <S.FooterImg
                  style={{ backgroundImage: `url(${mapData.image})` }}
                >
                  <MapStar starCnt={mapData.starCount} />
                </S.FooterImg>
              </S.CulturalProperty>
            ))}
          </S.InfoBox>
        </S.FooterBox>
      </S.FooterContainer>
    </div>
  );
}

const S = {
  FooterContainer: styled.div`
    ${tw` bg-subpink rounded-t-[3vh] pt-[3vh]`}
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
  InfoBox: styled.div`
    ${tw`flex overflow-y-scroll whitespace-nowrap`}
  `,
  CulturalProperty: styled.div`
    ${tw`px-[3vw] mt-[3vh] h-full flex flex-col `}
  `,

  FooterImg: styled.div`
    ${tw`w-[70vw] h-[20vh] relative`}
    background-repeat: no-repeat;
    background-size: cover;
  `,
};
