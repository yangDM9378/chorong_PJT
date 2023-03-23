import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import { QuizState, setQuizCnt, setSelectOption } from '../../store/quiz/slice';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  text: string;
  explanation: string;
  answer: string;
};

export default function quizModal({
  isOpen,
  close,
  text,
  explanation,
  answer,
}: ModalProps) {
  // quizCnt 값이 2보다 클경우 모달에 다른 버튼 띄우기 위해 사용
  const quizCnt = useSelector<AppState, QuizState['quizCnt']>(
    (state) => state.quiz.quizCnt,
  );

  const dispatch = useDispatch();
  const quizCntPlus = useCallback(() => {
    dispatch(setQuizCnt(1));
    close();
  }, [dispatch]);
  const quizCntInit = useCallback(() => {
    dispatch(setQuizCnt(-2));
    close();
  }, [dispatch]);
  const optionInit = useCallback(() => {
    dispatch(setSelectOption(''));
  }, [dispatch]);

  // 다음 문제로 이동하기
  const nextProblem = () => {
    quizCntPlus();
    optionInit();
  };

  // 결과보기 페이지로 이동하기
  const navigate = useNavigate();
  const quizScore = useCallback(() => {
    navigate('/quizscore', { replace: true });
  }, [navigate]);

  // 결과보기 페이지로 이동시 dispatch값 초기화 시키기
  const resultProblem = () => {
    quizCntInit();
    optionInit();
    quizScore();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => close()} ariaHideApp={false}>
      <div>{text}</div>
      <div>{explanation}</div>
      <div>{answer}</div>
      {quizCnt < 2 ? (
        <button type="button" onClick={nextProblem}>
          다음문제
        </button>
      ) : (
        <button type="button" onClick={resultProblem}>
          결과보기
        </button>
      )}
    </Modal>
  );
}
