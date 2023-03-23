import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { QuizState, setQuizCnt } from '../../store/quiz/slice';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  text: string;
};

export default function quizModal({ isOpen, close, text }: ModalProps) {
  const quizCnt = useSelector<AppState, QuizState['quizCnt']>(
    (state) => state.quiz.quizCnt,
  );
  const dispatch = useDispatch();
  const quizCntPlus = useCallback(() => {
    dispatch(setQuizCnt(1));
    close();
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} onRequestClose={() => close()} ariaHideApp={false}>
      <div>{text}</div>
      {quizCnt < 2 ? (
        <button type="button" onClick={quizCntPlus}>
          다음문제
        </button>
      ) : (
        <button type="button">결과보기</button>
      )}
    </Modal>
  );
}
