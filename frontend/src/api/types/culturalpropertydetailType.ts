// types.ts
export interface CulturalPropertyResult {
  culturalPropertyId: number;
  nameKo: string;
  nameCh: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  hiddenDescription: string;
  image: string;
  pinImage: string;
  stage: {
    stageId: number;
    stageName: string;
    stageImage: string;
    characterImage: string;
    description: string;
    targetStarCount: number;
  };
  pose: {
    poseId: number;
    poseName: string;
    posePicture: string;
  };
}

export interface CulturalPropertyData {
  result: {
    culturalProperty: CulturalPropertyData;
    starCount: number;
  };
  resultCode: number;
  resultMsg: string;
}
