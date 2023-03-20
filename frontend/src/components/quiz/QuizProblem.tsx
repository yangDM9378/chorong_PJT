import React from 'react';
// import useQuizData from '../../hooks/queries/useQuiz';
// import QuizProblemList from './QuizProblemList';

export default function QuizProblem() {
  // const { data: quizData, isLoading, error } = useQuizData();

  // useEffect(() => {
  //   if (quizData) {
  //     dispatch(saveQuizData(quizData));
  //   }
  // }, [dispatch, quizData]);

  // if (isLoading) {
  //   return <div>로딩중이야</div>;
  // }

  // if (error) {
  //   return <div> {error.message}</div>;
  // }

  // 예제용
  interface Quiz {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }
  const quizData: Quiz[] = [
    {
      question: '경주에 있는 첨성대가 지어진 시기는 언제인가?',
      options: ['신라시대', '고구려시대', '백제시대', '경주시대'],
      answer: '신라시대',
      explanation:
        '경주에 있는 첨성대는 신라시대 왕궁인 금오산성의 일부로, 7세기에 지어졌다.',
    },
    {
      question: '첨성대에서 일제강점기 때까지 사용된 것은?',
      options: ['성곽', '저장고', '거주지', '별관'],
      answer: '성곽',
      explanation:
        '첨성대는 신라시대 왕궁인 금오산성의 방어시설이자 호위구조물로 사용되었다. 일제강점기에는 일본인들이 첨성대를 채굴하여 내부구조와 고분벽, 그리고 지층까지 파괴해 놓았다.',
    },
    {
      question: '첨성대의 높이는 얼마인가?',
      options: ['25m', '30m', '35m', '40m'],
      answer: '30m',
      explanation:
        '첨성대는 5층의 높이로, 30미터가 넘는 높이를 가지고 있다. 특히 한옥처럼 나무와 대나무, 딱좋은 흙 등 자연의 재료만을 이용하여 만들어졌기 때문에 그 높이는 작품이라고 불리울 정도다.',
    },
  ];

  return (
    <div>
      {quizData.map((quiz) => (
        <div key={quiz.question}>
          <h3>{quiz.question}</h3>
          <ul>
            {quiz.options.map((option) => (
              <div key={option}>{option}</div>
            ))}
          </ul>
          <div>정답: {quiz.answer} </div>
          <div>해설: {quiz.explanation}</div>
        </div>
      ))}
    </div>
  );
}
