/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { AxiosResponse } from 'axios';
import { authApi } from '../libs/axiosConfig';

interface MapData {
  resultCode: number;
  resultMsg: string;
  result: MapResult[];
}

interface MapResult {
  culturalPropertyId: number;
  nameKo: string;
  latitude: number;
  longitude: number;
  pinImage: string;
}

export async function getMapData(stageNum: string): Promise<MapData | null> {
  try {
    const response: AxiosResponse<MapData> = await authApi.get(
      `cultural-properties/stage/${stageNum}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
