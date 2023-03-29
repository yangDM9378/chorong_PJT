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
    <div>
      {stageDatas?.map((stageData, index) => (
        <S.StageData
          key={stageData.stage.stageId}
          onClick={() => goStage(stageData.stage.stageId)}
        >
          <S.BgImg style={{ backgroundImage: `url(/main/bg/${index}.jpg)` }} />
          <S.StageNameDescriptionBox>
            <S.StageName>{stageData.stage.stageName}</S.StageName>
            <S.StageDescription>
              {stageData.stage.description}
            </S.StageDescription>
          </S.StageNameDescriptionBox>
          <S.Star>
            <img src="/main/star.png" alt="/main/star.png" />
            <p>
              {stageData.starCount}/{stageData.stage.targetStarCount}
            </p>
          </S.Star>
          {/* 별 다 획득시 */}
          {stageData.starCount === stageData.stage.targetStarCount && (
            <S.StarSuccess>
              <img src="/main/star.png" alt="/main/star.png" />
              <p>Clear</p>
            </S.StarSuccess>
          )}
        </S.StageData>
      ))}
    </div>
  );
}

const S = {
  StageData: styled.div`
    ${tw`relative flex items-center justify-around w-[90vw] h-[20vh] rounded-[4vw] mt-[3vh] px-[3vh] z-[1]`}
  `,
  BgImg: styled.div`
    ${tw`absolute top-0 left-0 w-full h-full opacity-50 bg-black z-[-1] rounded-[4vw]`}
    background-size: cover;
    background-position: center;
  `,
  StageNameDescriptionBox: styled.div`
    ${tw`w-[50vw]`}
  `,
  StageName: styled.p`
    ${tw` text-[3vh] font-bold`}
  `,
  StageDescription: styled.p`
    ${tw`mt-[1vh] font-semibold text-[2vh]`}
  `,
  Star: styled.div`
    ${tw`flex items-center`}
  `,
  StarSuccess: styled.div`
    ${tw`absolute flex items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-[2]`}
  `,
};
