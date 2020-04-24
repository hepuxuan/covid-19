import React from 'react';
import moment from 'moment';
import {
  useDailyData, useConfirmData, useOverallData, useDailyDetailsData,
} from './hooks/data';

export default [{
  component: React.lazy(() => import('./pages/index')),
  path: '/',
  exact: true,
  usePrefetch() {
    useDailyData({
      suspense: false,
    });
    useConfirmData({
      suspense: false,
    });
    useOverallData({
      suspense: false,
    });
    useDailyDetailsData(moment().subtract(2, 'days').format('YYYY-MM-DD'), {
      suspense: false,
    });
  },
}, {
  component: React.lazy(() => import('./pages/countries')),
  path: '/countries',
  exact: true,
  usePrefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/country')),
  path: '/countries/:country',
  exact: true,
  usePrefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/daily-trend')),
  path: '/daily-trend',
  exact: true,
  usePrefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/daily-details')),
  path: '/daily-trend/:date',
  exact: true,
  usePrefetch: () => { },
}, {
  component: React.lazy(() => import('./pages/daily-country-details')),
  path: '/daily-trend/:date/:country',
  exact: true,
  usePrefetch: () => { },
}];
