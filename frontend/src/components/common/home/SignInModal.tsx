/* eslint-disable prefer-template */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../api/userApi';
// import styled from 'styled-components';
// import tw from 'twin.macro';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

type SignInFormData = {
  email: string;
  password: string;
};

interface SignInData {
  email: string;
  password: string;
}

export default function SignInModal({ isOpen, close }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>();

  // 로그인 성공시 main으로 이동
  const navigate = useNavigate();
  const gomain = useCallback(() => {
    navigate('/stage');
  }, [navigate]);

  // 로그인 통신부분
  const onSubmit = useCallback(
    async (formData: SignInFormData) => {
      const data: SignInData = {
        email: formData.email,
        password: formData.password,
      };
      const accesstoken = await signIn(data);
      if (accesstoken) {
        localStorage.setItem('accesstoken', accesstoken);
        gomain();
        close();
        alert('로그인 성공');
      } else {
        alert('로그인 실패');
      }
    },
    [close],
  );

  // oauth부분
  const API_BASE_URL = 'http://j8c101.p.ssafy.io:8080/';
  const OAUTH2_REDIRECT_URI = 'https://j8c101.p.ssafy.io/oauth2/redirect';
  // const API_BASE_URL = 'http://localhost:8080/';
  // const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
  const GOOGLE_AUTH_URL =
    API_BASE_URL +
    'oauth2/authorize/google?redirect_uri=' +
    OAUTH2_REDIRECT_URI;

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
      <div className="items-center justify-center">
        <div>
          <h1 className="mb-4 text-3xl font-bold text-center cursor-pointer">
            로그인
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            id="email"
            autoComplete="new-password"
            placeholder="Email Addres"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none"
            {...register('email', { required: true })}
          />
          {errors.email && errors.email.type === 'required' && (
            <span className="px-[1vw] text-red-500">
              이메일을 입력해 주세요!
            </span>
          )}

          <input
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="Password"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none"
            {...register('password', { required: true })}
          />
          <div className="text-center">
            <button
              type="submit"
              className="w-64 py-3 text-xl text-white bg-mainred rounded-2xl"
            >
              Submit
            </button>
          </div>
        </form>
        <a href={GOOGLE_AUTH_URL}>
          <div>111 </div>
        </a>
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
