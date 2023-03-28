interface CulturalPropertyResult {
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
  stage: Stage;
  pose: Pose;
}

interface Pose {
  poseId: number;
  poseName: string;
  posePicture: string;
}

interface Stage {
  stageId: number;
  stageName: string;
  stageImage: string;
  characterImage: string;
  description: string;
  targetStarCount: number;
}
interface Result {
  culturalProperty: CulturalPropertyResult;
  starCount: number;
}

export interface CulturalPropertyData {
  result: Result;
  resultCode: number;
  resultMsg: string;
}
