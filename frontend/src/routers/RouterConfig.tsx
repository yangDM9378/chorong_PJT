import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/common/HomePage';
import NoMatchPage from '../pages/common/NoMatchPage';
import CameraPage from '../pages/camera/CameraPage';
import CulturalPropertyDetailPage from '../pages/culturalpropertydetail/CulturalPropertyDetailPage';
import QuizPage from '../pages/quiz/QuizPage';
import QuizScorePage from '../pages/quiz/QuizScorePage';
import MainPage from '../pages/common/MainPage';
import AfterCameraPage from '../pages/camera/AfterCameraPage';

const RouterConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatchPage />,
    children: [
      { index: true, path: '/', element: <HomePage /> },
      { path: '/main', element: <MainPage /> },
      { path: '/camera', element: <CameraPage /> },
      { path: '/camera/after', element: <AfterCameraPage /> },
      {
        path: '/culturalpropertydetail',
        element: <CulturalPropertyDetailPage />,
      },
      { path: '/quiz', element: <QuizPage /> },
      { path: '/quizscore', element: <QuizScorePage /> },
    ],
  },
]);

export default RouterConfig;
