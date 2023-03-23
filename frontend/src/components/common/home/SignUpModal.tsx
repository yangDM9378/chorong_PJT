import Modal from 'react-modal';
import React, { useCallback, useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

export default function SignUpModal({ isOpen, close }: ModalProps) {
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      close();
    },
    [email, nickname, password, passwordCheck],
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={() => close()} ariaHideApp={false}>
      <div>회원 가입</div>
      <form onSubmit={onSubmit}>
        <span>이메일 주소</span>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <span>이름</span>
        <div>
          <input
            name="nickname"
            value={nickname}
            onChange={(event) => {
              setNickname(event.target.value);
            }}
          />
        </div>
        <span>비밀번호</span>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <span>비밀번호 체크</span>
        <div>
          <input
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={(event) => {
              setPasswordCheck(event.target.value);
            }}
          />
        </div>
        <button type="submit">확인</button>
      </form>
    </Modal>
  );
}
