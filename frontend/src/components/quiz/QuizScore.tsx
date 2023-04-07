import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
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
        <S.QuizScoreWhite>
          <S.QuizScoreText>다시도전해주요</S.QuizScoreText>
          <S.QuizScoreCnt>{correctCnt}/3</S.QuizScoreCnt>
        </S.QuizScoreWhite>
        <S.QuizScoreCircleleft />
        <S.QuizScoreHr />
        <S.QuizScoreCircleright />
        <S.QuizScoreWhite>
          <img
            src="/quizscore/bad.png"
            alt="/quizscore/bad.png"
            className="w-[30vw]"
          />
        </S.QuizScoreWhite>
      </div>
    );
  return (
    <div>
      <S.QuizScoreWhite>
        <S.QuizScoreText>축하드립니다</S.QuizScoreText>
        <S.QuizScoreCnt>{correctCnt}/3</S.QuizScoreCnt>
      </S.QuizScoreWhite>
      <S.QuizScoreCircleleft />
      <S.QuizScoreHr />
      <S.QuizScoreCircleright />
      <S.QuizScoreWhite>
        <img
          src="/quizscore/good.png"
          alt="/quizscore/good.png"
          className="w-[30vw]"
        />
      </S.QuizScoreWhite>
    </div>
  );
}

const S = {
  QuizScoreWhite: styled.div`
    ${tw`bg-white h-[35vh] rounded-[3vh] flex flex-col justify-center items-center`}
  `,
  QuizScoreText: styled.div`
    ${tw`rounded-[3vh] text-[4vh]`}
  `,
  QuizScoreCnt: styled.div`
    ${tw`rounded-[3vh] text-[6vh]`}
  `,
  QuizScoreHr: styled.hr`
    ${tw`mx-[3vh] border-dashed border-[2px] border-[#D38E8E] bg-white`}
  `,
  QuizScoreCircleleft: styled.hr`
    ${tw`w-[3vh] h-[6vh] rounded-r-[3vh] rounded-l-[0vh] bg-quizbg absolute translate-y-[-50%]`}
  `,
  QuizScoreCircleright: styled.hr`
    ${tw`w-[3vh] h-[6vh] rounded-r-[0vh] rounded-l-[3vh] bg-quizbg absolute right-[4vw] translate-y-[-50%]`}
  `,
};
