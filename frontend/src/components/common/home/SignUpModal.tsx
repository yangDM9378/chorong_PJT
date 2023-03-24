import Modal from 'react-modal';
import React, { useCallback, useRef, useState } from 'react';

const customStyles = {
  content: {
    border: '1px solid #ccc',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5%',
    padding: '5%',
  },
};

type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

export default function SignUpModal({ isOpen, close }: ModalProps) {
  console.clear();

  const logInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

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
    <Modal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="mjustify-center items-center">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            회원가입
          </h1>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Addres"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="text"
            placeholder="Name"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            placeholder="Password Check"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-mainred rounded-2xl"
          >
            Create Account
          </button>
        </div>
      </div>
    </Modal>
  );
}
