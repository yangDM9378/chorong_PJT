/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'twin.macro';

const S = {
  SignInForm: styled.form`
    ${tw`py-10`}
  `,
  Input: styled.input`
    ${tw`block`}
  `,
};

type SignInModalProps = {
  onClose: () => void;
};

type FormValues = {
  email: string;
  password: string;
};

export default function SignInModal({ onClose }: SignInModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = () => {
    onClose();
  };

  return (
    <S.SignInForm onSubmit={handleSubmit(onSubmit)}>
      <S.Input type="email" {...register('email', { required: true })} />
      {errors.email && errors.email.type === 'required' && (
        <div>이메일을 입력해 주세요!</div>
      )}
      <S.Input type="password" {...register('password')} />

      <S.Input type="submit" />
    </S.SignInForm>
  );
}
