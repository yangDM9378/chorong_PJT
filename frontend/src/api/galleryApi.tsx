/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { AxiosResponse } from 'axios';
import { authApi } from '../libs/axiosConfig';

interface GalleryData {
  resultCode: number;
  resultMsg: string;
  result: GalleryResult[];
}

interface SetGalleryData {
  culturalPropertyId: number;
  picture: File | undefined;
}
interface GalleryResult {
  picture: File;
}

// 개별 문화재의 photo 데이터 값입니다.
interface PhotoData {
  resultCode: number;
  resultMsg: string;
  result: [];
}

export async function getGalleryData(): Promise<GalleryData | null> {
  try {
    const response: AxiosResponse<GalleryData> = await authApi.get(
      `/galleries/`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function setGalleryData(data: SetGalleryData): Promise<void> {
  await authApi.post(`/galleries/`, data);
}

export async function getGalleryDetailData(
  no?: number,
): Promise<PhotoData | null> {
  try {
    const response: AxiosResponse<PhotoData> = await authApi.get(
      `/galleries/${no}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
