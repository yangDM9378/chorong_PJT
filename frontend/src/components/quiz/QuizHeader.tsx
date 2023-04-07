import styled from 'styled-components';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { QuizState } from '../../store/quiz/slice';

export default function QuizHeader() {
  const quizCnt = useSelector<AppState, QuizState['quizCnt']>(
    (state) => state.quiz.quizCnt,
  );
  const progressPercentage = (quizCnt / 3) * 100;

  return (
    <S.QuizHeaderBox>
      Q{quizCnt + 1}.
      <S.QuizProgressBar progressPercentage={progressPercentage} />
    </S.QuizHeaderBox>
  );
}

const S = {
  QuizHeaderBox: styled.div`
    ${tw`text-[8vh] font-medium mx-[3vh] relative`}
  `,
  QuizProgressBar: styled.div<{ progressPercentage: number }>`
    ${tw`h-[1.5vh] bg-[#D9D9D9] absolute bottom-[-1vh] left-0 w-full rounded-[5vh]`}
    &::after {
      content: '';
      ${tw`absolute bottom-0 left-0 h-full bg-mainred rounded-[5vh]`}
      width: ${(props) => props.progressPercentage}%;
    }
  `,
};
