import React from 'react';
import usePrefetch from './pages/index/prefetch';

export default [{
  component: React.lazy(() => import('./pages/index')),
  path: '/',
  exact: true,
  prefetch: usePrefetch,
}, {
  component: React.lazy(() => import('./pages/countries')),
  path: '/countries',
  exact: true,
  prefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/country')),
  path: '/countries/:country',
  exact: true,
  prefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/daily-trend')),
  path: '/daily-trend',
  exact: true,
  prefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/daily-details')),
  path: '/daily-trend/:date',
  exact: true,
  prefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/daily-country-details')),
  path: '/daily-trend/:date/:country',
  exact: true,
  prefetch: () => { },
}];
