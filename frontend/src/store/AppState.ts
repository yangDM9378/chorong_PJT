import { QuizState } from './quiz/slice';
import { CameraState } from './camera/slice';

export type AppState = {
  quiz: QuizState;
  camera: CameraState;
};
