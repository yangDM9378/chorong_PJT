import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/common/Home';
import NoMatch from '../pages/common/NoMatch';
import SearchCulturalProperty from '../pages/search/SearchCulturalProperty';
import Camera from '../pages/camera/Camera';
import RegionMap from '../pages/map/RegionMap';

const RouterConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/regionmap', element: <RegionMap /> },
      { path: '/searchculturalproperty', element: <SearchCulturalProperty /> },
      { path: '/camera', element: <Camera /> },
    ],
  },
]);

export default RouterConfig;
