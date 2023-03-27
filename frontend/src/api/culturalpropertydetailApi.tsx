/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { authApi } from '../libs/axiosConfig';
import { CulturalPropertyData } from '../types/culturalpropertytype';

export async function CulturalProperty(
  num: number,
): Promise<CulturalPropertyData> {
  try {
    const response = await authApi.get(`/cultural-properties/${num}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('실패');
  } catch (error) {
    throw new Error('실패');
  }
}
