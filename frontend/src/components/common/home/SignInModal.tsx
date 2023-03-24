/* eslint-disable react/jsx-props-no-spreading */
import Modal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
// import styled from 'styled-components';
// import tw from 'twin.macro';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

interface LoginFormValues {
  email: string;
  password: string;
}

export default function SignInModal({ isOpen, close }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = () => {
    close();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            로그인
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            id="email"
            placeholder="Email Addres"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            {...register('email', { required: true })}
          />
          {errors.email && errors.email.type === 'required' && (
            <div className="text-sm py-3 px-1 rounded-lg w-full">
              이메일을 입력해 주세요!
            </div>
          )}

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            {...register('password', { required: true })}
          />

          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-mainred rounded-2xl"
          >
            Submit
          </button>
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
