import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { QuizState } from '../../store/quiz/slice';

export default function QuizHeader() {
  const quizCnt = useSelector<AppState, QuizState['quizCnt']>(
    (state) => state.quiz.quizCnt,
  );

  return <div>Q{quizCnt + 1}.</div>;
}
