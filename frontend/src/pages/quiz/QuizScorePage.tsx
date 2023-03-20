import React from 'react';
import QuizCard from '../../components/quiz/QuizCard';

export default function QuizScorePage() {
  return (
    <div>
      <QuizCard />
      {/* 여기 버튼 컴퍼넌트 들어갈곳 */}
      <button type="button">다시풀기</button>
      <button type="button">갤러리</button>
    </div>
  );
}
