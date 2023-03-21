import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import * as C from '../../store/quiz';

export default function QuizHeader() {
  const quizCnt = useSelector<AppState, C.State>(({ quiz }) => quiz);

  return <div>Q{quizCnt + 1}.</div>;
}
