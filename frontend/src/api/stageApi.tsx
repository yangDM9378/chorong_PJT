/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { AxiosResponse } from 'axios';
import { authApi } from '../libs/axiosConfig';
import { StageData } from '../types/stage';

export async function getStageData(): Promise<StageData | null> {
  try {
    const response: AxiosResponse<StageData> = await authApi.get(
      '/cultural-properties/stage',
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
