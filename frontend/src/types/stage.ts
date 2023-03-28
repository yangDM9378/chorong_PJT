export interface StageData {
  resultCode: number;
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
