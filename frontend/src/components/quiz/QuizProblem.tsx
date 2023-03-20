import React from 'react';
// import QuizView from './QuizView';

interface Quiz {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizProblemProps {
  quiz: Quiz;
  index: number;
  // quizCnt: number;
}

export default function QuizProblem({
  quiz,
  index,
}: // quizCnt,
QuizProblemProps) {
  // if (index !== quizCnt) return null;
  return (
    <div key={quiz.question}>
      {index}
      {/* {quizCnt} */}
      <h3>{quiz.question}</h3>
      <ul>
        {quiz.options.map((option) => (
          <div key={option}>{option}</div>
        ))}
      </ul>
      <div>정답: {quiz.answer} </div>
      <div>해설: {quiz.explanation}</div>
    </div>
  );
}
