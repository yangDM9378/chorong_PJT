/* eslint-disable no-console */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import { QuizState, setCorrectCnt } from '../../store/quiz/slice';

export default function QuizScoreButtons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 맞은 갯수 초기화시 사용
  const correctCnt = useSelector<AppState, QuizState['correctCnt']>(
    (state) => state.quiz.correctCnt,
  );
  // 퀴즈페이지 처음으로 가기
  const goQuiz = useCallback(() => {
    navigate('/quiz');
  }, [navigate]);
  // 맞은 갯수 초기화 하기
  const correctCntInit = useCallback(() => {
    dispatch(setCorrectCnt(-correctCnt));
  }, [dispatch]);

  const returnSolveClick = () => {
    correctCntInit();
    goQuiz();
  };

  // 퀴즈끝내고 갤러리로 이동
  const goCulturalPropertyDetail = useCallback(() => {
    navigate('/culturalpropertydetail');
  }, [navigate]);

  const quizFinish = () => {
    goCulturalPropertyDetail();
    correctCntInit();
  };

  return (
    <div>
      <button type="button" onClick={returnSolveClick}>
        다시풀기
      </button>
      <button type="button" onClick={quizFinish}>
        갤러리로 이동
      </button>
    </div>
  );
}
