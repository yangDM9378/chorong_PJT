import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NoMatch from '../pages/common/NoMatch';
import Home from '../pages/common/Home';
import App from '../App';
import SignIn from '../pages/user/SignIn';
import SignUp from '../pages/user/SignUp';
import Camera from '../pages/camera/Camera';
import RegionMap from '../pages/map/RegionMap';
import Catagory from '../pages/gallery/Catagory';
import CulturalProperty from '../pages/gallery/CulturalProperty';
import CulturalPropertyDetail from '../pages/gallery/CulturalPropertyDetail';
import MyPage from '../pages/mypage/MyPage';
import Achievement from '../pages/mypage/Achievement';
import AchievementRoom from '../pages/mypage/AchievementRoom';

const RouterConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/camera', element: <Camera /> },
      { path: '/regionmap', element: <RegionMap /> },
      { path: '/catagory', element: <Catagory /> },
      { path: '/culturalproperty', element: <CulturalProperty /> },
      {
        path: '/culturalpropertydetail/:culturalpropertyid',
        element: <CulturalPropertyDetail />,
      },
      { path: '/mypage', element: <MyPage /> },
      { path: '/mypage/achievement', element: <Achievement /> },
      { path: '/mypage/achievementroom', element: <AchievementRoom /> },
    ],
  },
]);

export default RouterConfig;
