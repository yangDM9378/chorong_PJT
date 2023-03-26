/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import Modal from 'react-modal';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../../../api/userApi';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

type SignUpFormData = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

interface SignUpData {
  email: string;
  password: string;
  nickname: string;
}

export default function SignUpModal({ isOpen, close }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    reset,
  } = useForm<SignUpFormData>();

  // const password = useRef({});
  // password.current = watch('password', '');

  const onSubmit = useCallback(
    async (formData: SignUpFormData) => {
      if (formData.password !== formData.passwordCheck) {
        alert('비밀번호를 다시 확인해주세요');
        return;
      }
      const data: SignUpData = {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      };
      await signUp(data);
      reset();
      close();
      alert('회원가입이 완료되었습니다');
    },
    [close],
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        reset();
        close();
      }}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="items-center mjustify-center">
        <div>
          <h1 className="mb-4 text-3xl font-bold text-center cursor-pointer">
            회원가입
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none"
          />
          {errors.email && (
            <span className="px-[1vw] text-red-500">
              {errors.email.message}
            </span>
          )}

          <input
            type="text"
            placeholder="Name"
            autoComplete="new-password"
            {...register('nickname', { required: 'Nickname is required' })}
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none"
          />
          {errors.nickname && (
            <span className="px-[1vw] text-red-500">
              {errors.nickname.message}
            </span>
          )}

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register('password', { required: 'Password is required' })}
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none"
          />
          {errors.password && (
            <span className="px-[1vw] text-red-500">
              {errors.password.message}
            </span>
          )}

          <input
            type="password"
            placeholder="Password Check"
            autoComplete="new-password"
            {...register('passwordCheck', {
              required: 'Password check is required',
            })}
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none"
          />
          {errors.passwordCheck && (
            <span className="px-[1vw] text-red-500">
              {errors.passwordCheck.message}
            </span>
          )}

          <div className="text-center ">
            <button
              type="submit"
              className="w-64 py-3 text-xl text-white bg-mainred rounded-2xl"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
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
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5%',
    padding: '5%',
  },
};
