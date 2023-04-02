import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getMapData } from '../../api/mapApi';
import Gwangjustage from '../../components/map/Gwangjustage';
import StageFooter from '../../components/map/StageFooter';
import { MapResult } from '../../types/map';

export default function GwangjustagePage() {
  // 데이터 가져오기
  const [mapDatas, setMapDatas] = useState<MapResult[] | null>([]);
  const location = useLocation();
  const { stageInfo } = location.state;

  useEffect(() => {
    if (stageInfo[0] === undefined) return;
    const getMapDatas = async () => {
      const response = await getMapData(stageInfo[0]);
      if (response) {
        setMapDatas(response.result);
      }
    };
    getMapDatas();
  }, [stageInfo]);

  return (
    <S.Container>
      <div>
        <Gwangjustage mapDatas={mapDatas} />
      </div>
      <StageFooter mapDatas={mapDatas} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`max-h-[100vh] w-full bg-maingray`}
  `,
};
