import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/common/HomePage';
import NoMatchPage from '../pages/common/NoMatchPage';
import CameraPage from '../pages/camera/CameraPage';
import CulturalPropertyPage from '../pages/culturalproperty/CulturalPropertyPage';
import QuizPage from '../pages/quiz/QuizPage';
import QuizScorePage from '../pages/quiz/QuizScorePage';
import StagePage from '../pages/stage/StagePage';
import AfterCameraPage from '../pages/camera/AfterCameraPage';
import SsafyStagePage from '../pages/map/SsafyStagePage';
import GwangjuStagePage from '../pages/map/GwangjustagePage';
import GalleryPage from '../pages/camera/GalleryPage';
import OAuthPage from '../pages/common/OAuthPage';

const RouterConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatchPage />,
    children: [
      { index: true, path: '/', element: <HomePage /> },
      { path: '/oauth2/redirect', element: <OAuthPage /> },
      { path: '/stage', element: <StagePage /> },
      { path: '/map/1', element: <GwangjuStagePage /> },
      { path: '/map/2', element: <SsafyStagePage /> },
      { path: '/camera', element: <CameraPage /> },
      { path: '/camera/after', element: <AfterCameraPage /> },
      { path: '/gallery', element: <GalleryPage /> },

      {
        path: '/culturalpropertydetail/:culturalpropertynum',
        element: <CulturalPropertyPage />,
      },
      { path: '/quiz/:region/:nameKo', element: <QuizPage /> },
      { path: '/quizscore', element: <QuizScorePage /> },
    ],
  },
]);

export default RouterConfig;
