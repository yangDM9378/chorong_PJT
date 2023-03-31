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

// 전달받는 데이터 타입이 바뀌었습니다. result를 파일에서 []로 바꾸겠습니다.

// 전체 사진 데이터 받아옵니다.
export async function getGalleryData(): Promise<PhotoData | null> {
  try {
    const response: AxiosResponse<PhotoData> = await authApi.get(`/galleries/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function setGalleryData(data: SetGalleryData): Promise<void> {
  await authApi.post(`/galleries/`, data);
}

// 문화재마다 사진데이터 받아옵니다.
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
