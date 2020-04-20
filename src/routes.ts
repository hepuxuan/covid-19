import React from 'react';

export default [{
  component: React.lazy(() => import('./pages/index')),
  path: '/',
  exact: true,
}, {
  component: React.lazy(() => import('./pages/countries')),
  path: '/countries',
  exact: true,
}, {
  component: React.lazy(() => import('./pages/country')),
  path: '/countries/:country',
  exact: true,
}, {
  component: React.lazy(() => import('./pages/daily-trend')),
  path: '/daily-trend',
  exact: true,
}, {
  component: React.lazy(() => import('./pages/daily-details')),
  path: '/daily-trend/:date',
  exact: true,
}, {
  component: React.lazy(() => import('./pages/daily-country-details')),
  path: '/daily-trend/:date/:country',
  exact: true,
}];
