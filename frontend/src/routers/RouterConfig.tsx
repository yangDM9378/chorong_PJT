import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/common/HomePage';
import NoMatchPage from '../pages/common/NoMatchPage';
import SearchPage from '../pages/search/SearchPage';
import CameraPage from '../pages/camera/CameraPage';
import CategoryMapPage from '../pages/category/CategoryMapPage';
import DiaryPage from '../pages/diary/DiaryPage';
import AchievementPage from '../pages/achievement/AchievementPage';
import CategoryRegionPage from '../pages/category/CategoryRegionPage';
import CategoryDetailPage from '../pages/category/CategoryDetailPage';
import QuizPage from '../pages/quiz/QuizPage';
import QuizScorePage from '../pages/quiz/QuizScorePage';

const RouterConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatchPage />,
    children: [
      { index: true, path: '/', element: <HomePage /> },
      { path: '/achievement', element: <AchievementPage /> },
      { path: '/camera', element: <CameraPage /> },
      { path: '/categorymap', element: <CategoryMapPage /> },
      { path: '/categoryregion', element: <CategoryRegionPage /> },
      { path: '/categorydetail', element: <CategoryDetailPage /> },
      { path: '/diary', element: <DiaryPage /> },
      { path: '/quiz', element: <QuizPage /> },
      { path: '/quizscore', element: <QuizScorePage /> },
      { path: '/search', element: <SearchPage /> },
    ],
  },
]);

export default RouterConfig;
