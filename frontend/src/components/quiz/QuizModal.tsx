import styled from 'styled-components';
import tw from 'twin.macro';
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
    <Modal
      isOpen={isOpen}
      // onRequestClose={() => close()}
      ariaHideApp={false}
      style={customStyles}
    >
      <S.Text>{text}</S.Text>
      <S.Answer>{answer}</S.Answer>
      <S.Explanation>{explanation}</S.Explanation>
      {quizCnt < 2 ? (
        <S.ButtonBox>
          <S.Button type="button" onClick={nextProblem}>
            다음문제
          </S.Button>
        </S.ButtonBox>
      ) : (
        <S.ButtonBox>
          <S.Button type="button" onClick={resultProblem}>
            결과보기
          </S.Button>
        </S.ButtonBox>
      )}
    </Modal>
  );
}

const customStyles = {
  content: {
    border: '1px solid #ccc',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5%',
    padding: '5%',
  },
};

const S = {
  Text: styled.div`
    ${tw`text-[4vh] text-center `}
  `,
  Answer: styled.div`
    ${tw`my-[2vh] mx-[2vw] text-center py-[2vh] border-solid border-[0.5vh] border-[mainred] rounded-[1vh]`}
  `,
  Explanation: styled.div`
    ${tw`mx-[2vw] text-[2vh]`}
  `,
  ButtonBox: styled.div`
    ${tw`flex items-center justify-center mt-[3vh]`}
  `,
  Button: styled.button`
    ${tw`bg-mainred text-[2vh] text-white py-[1vh] px-[3vw] rounded-[2vh]`}
  `,
};
