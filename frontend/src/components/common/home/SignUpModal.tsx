/* eslint-disable react/jsx-props-no-spreading */
import Modal from 'react-modal';
import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';

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

type SignUpFormData = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

export default function SignUpModal({ isOpen, close }: ModalProps) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = useCallback(
    // (formData: SignUpFormData): void
    () => {
      close();
    },
    [close],
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
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="text"
            placeholder="Name"
            {...register('nickname', { required: 'Nickname is required' })}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            placeholder="Password Check"
            {...register('passwordCheck', {
              required: 'Password check is required',
            })}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 w-64 text-xl text-white bg-mainred rounded-2xl"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
