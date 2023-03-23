/* eslint-disable react/jsx-props-no-spreading */
import Modal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'twin.macro';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

type FormValues = {
  email: string;
  password: string;
};

export default function SignInModal({ isOpen, close }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = () => {
    close();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={() => close()} ariaHideApp={false}>
      <S.SignInForm onSubmit={handleSubmit(onSubmit)}>
        <S.Input type="email" {...register('email', { required: true })} />
        {errors.email && errors.email.type === 'required' && (
          <div>이메일을 입력해 주세요!</div>
        )}
        <S.Input type="password" {...register('password')} />

        <S.Input type="submit" />
      </S.SignInForm>
    </Modal>
  );
}

const S = {
  SignInForm: styled.form`
    ${tw`py-10`}
  `,
  Input: styled.input`
    ${tw`block`}
  `,
};
