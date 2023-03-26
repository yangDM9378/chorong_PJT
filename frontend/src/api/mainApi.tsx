/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { AxiosResponse } from 'axios';
import { authApi } from '../libs/axiosConfig';

interface StageData {
  resultcode: number;
  resultMsg: string;
  result: StageResult[];
}

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

// stageData
export async function getStageData(): Promise<StageData | null> {
  try {
    const response: AxiosResponse<StageData> = await authApi.get(
      'cultural-properties/stage',
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
