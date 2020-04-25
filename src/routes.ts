import React from 'react';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import {
  useDailyData, useConfirmData, useOverallData, useDailyDetailsData, useCountries,
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
  usePrefetch: () => {
    const prevDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
    useConfirmData({
      suspense: false,
    });
    useDailyDetailsData(prevDate, {
      suspense: false,
    });
  },
}, {
  component: React.lazy(() => import('./pages/country')),
  path: '/countries/:country',
  exact: true,
  usePrefetch: () => {
    const date = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    useDailyDetailsData(date, {
      suspense: false,
    });
    useDailyDetailsData(prevDate, {
      suspense: false,
    });
  },
}, {
  component: React.lazy(() => import('./pages/daily-trend')),
  path: '/daily-trend',
  exact: true,
  usePrefetch: () => {
    useDailyData({
      suspense: false,
    });
  },
}, {
  component: React.lazy(() => import('./pages/daily-details')),
  path: '/daily-trend/:date',
  exact: true,
  usePrefetch: (props: RouteComponentProps<{ date: string }>) => {
    const { date } = props.match.params;
    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    useDailyDetailsData(date, {
      suspense: false,
    });
    useDailyDetailsData(prevDate, {
      suspense: false,
    });
    useCountries({
      suspense: false,
    });
  },
}, {
  component: React.lazy(() => import('./pages/daily-country-details')),
  path: '/daily-trend/:date/:country',
  exact: true,
  usePrefetch: (props: RouteComponentProps<{ date: string }>) => {
    const { date } = props.match.params;
    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    useDailyDetailsData(date, {
      suspense: false,
    });
    useDailyDetailsData(prevDate, {
      suspense: false,
    });
  },
}];
