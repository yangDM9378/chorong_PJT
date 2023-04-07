import { QuizState } from './quiz/slice';
import { CameraState } from './camera/slice';
import { CulturalPropertyState } from './culturalproperty/slice';

export type AppState = {
  quiz: QuizState;
  camera: CameraState;
  culturalProperty: CulturalPropertyState;
};
