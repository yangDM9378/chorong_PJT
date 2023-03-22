import ReactModal from 'react-modal';
import { useState } from 'react';
import SignInModal from '../../components/common/home/SignInModal';
import SignUpModal from '../../components/common/home/SignUpModal';
import HomeCarousel from '../../components/common/home/HomeCarousel';

export default function HomePage() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const signUpClose = () => {
    setSignUpOpen(false);
  };
  const signInClose = () => {
    setSignInOpen(false);
  };

  return (
    <div className="font-nanum">
      <p className="text-mainred">문구</p>
      <p className="text-maingreen">111111</p>
      <HomeCarousel />
      <button
        type="button"
        onClick={() => {
          setSignInOpen(true);
        }}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => {
          setSignUpOpen(true);
        }}
      >
        Sign Up
      </button>

      {signInOpen && (
        <ReactModal isOpen={signInOpen} onRequestClose={signInClose}>
          <SignInModal onClose={signInClose} />
        </ReactModal>
      )}
      {signUpOpen && (
        <ReactModal isOpen={signUpOpen} onRequestClose={signUpClose}>
          <SignUpModal onClose={signUpClose} />
        </ReactModal>
      )}
    </div>
  );
}
