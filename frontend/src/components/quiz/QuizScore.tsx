import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { QuizState } from '../../store/quiz/slice';

export default function QuizScore() {
  const correctCnt = useSelector<AppState, QuizState['correctCnt']>(
    (state) => state.quiz.correctCnt,
  );
  // 맞은 갯수에 따라 다른 형태의 띄우기
  if (correctCnt < 2)
    return (
      <div>
        <div>{correctCnt}/3</div>
        <div>실패</div>
      </div>
    );
  return (
    <div>
      <div>{correctCnt}/3</div>
      <div>성공</div>
    </div>
  );
}
