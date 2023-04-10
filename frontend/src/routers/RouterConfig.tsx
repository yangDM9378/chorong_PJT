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
import GwangjuStagePage from '../pages/map/GwangjuStagePage';
import DeaguStagePage from '../pages/map/DeaguStagePage';
import SeoulstagePage from '../pages/map/SeoulStagePage';
import GalleryPage from '../pages/gallery/GalleryPage';
import OAuthPage from '../pages/common/OAuthPage';
import ArPage from '../pages/AR/ArPage';

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
      { path: '/map/2', element: <DeaguStagePage /> },
      { path: '/map/3', element: <SeoulstagePage /> },
      { path: '/camera', element: <CameraPage /> },
      { path: '/camera/after', element: <AfterCameraPage /> },
      { path: '/gallery/:userId', element: <GalleryPage /> },
      {
        path: '/culturalpropertydetail/:culturalpropertynum',
        element: <CulturalPropertyPage />,
      },
      { path: '/quiz/:region/:nameKo', element: <QuizPage /> },
      { path: '/quizscore', element: <QuizScorePage /> },
      { path: '/AR/redirect', element: <ArPage /> },
    ],
  },
]);

export default RouterConfig;
