/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getStageData } from '../../api/stageApi';

interface StageResult {
  stage: Stage;
  starCount: number;
}

interface Stage {
  stageId: number;
  stageName: string;
  stageImage: string;
  characterImage: string;
  description: string;
  targetStarCount: number;
}

export default function StageTheme() {
  const [stageDatas, setStagesDatas] = useState<StageResult[] | null>([]);

  useEffect(() => {
    const StageDatas = async () => {
      const response = await getStageData();
      if (response) {
        setStagesDatas(response.result);
      }
    };
    StageDatas();
  }, []);

  const navigate = useNavigate();
  const goStage = (stageNum: number) => {
    navigate(`/map/${stageNum}`, { state: { stageNum } });
  };

  return (
    <S.Container>
      {stageDatas?.map((stageData, index) => (
        <S.StageTheme>
          <button
            type="button"
            key={stageData.stage.stageId}
            onClick={() => goStage(stageData.stage.stageId)}
          >
            <S.MainContainer>
              <S.NameStar>
                <S.Name>{stageData.stage.stageName}</S.Name>
                <S.Star>
                  <img src="/main/star.png" alt="/main/star.png" />
                  <S.StarCnt>
                    {stageData.starCount}/{stageData.stage.targetStarCount}
                  </S.StarCnt>
                </S.Star>
              </S.NameStar>
              <S.BgImg
                style={{ backgroundImage: `url(/main/bg/${index}.jpg)` }}
              />
              {/* <div style={{ backgroundImage: `url(/main/bg/${index}.jpg)` }} /> */}
            </S.MainContainer>
            {/* 별 다 획득시
          {stageData.starCount === stageData.stage.targetStarCount && (
            <div>
              <img src="/main/star.png" alt="/main/star.png" />
              <p>Clear</p>
            </div>
          )} */}
          </button>
        </S.StageTheme>
      ))}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-[65vh] pt-[2vh]`}
  `,
  StageTheme: styled.button`
    ${tw`py-[3vh] relative`}
  `,
  MainContainer: styled.div`
    ${tw` mx-[3vw] pl-[5vw] bg-white rounded-[2vh] w-[94vw] pt-[2vh] pb-[3vh] shadow-lg`}
  `,
  NameStar: styled.div`
    ${tw`flex flex-col border-l border-spacing-1 border-solid border-l-black ml-[20vw] pl-[3vw] `}
  `,
  Name: styled.p`
    ${tw`text-[3vh] font-bold flex`}
  `,
  Star: styled.div`
    ${tw`flex items-center`}
  `,
  StarCnt: styled.div`
    ${tw`m-[2vw] pt-[3px]`}
  `,
  BgImg: styled.div`
    ${tw`absolute w-[20vh] h-[20vh] rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2`}
    background-repeat: no-repeat;
    background-size: cover;
  `,
  // StarSuccess: styled.div`
  //   ${tw`absolute flex items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-[2]`}
  // `,
};
