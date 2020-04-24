import React from 'react';
import { Card } from '@rmwc/card';
import { GridCell, Grid, GridRow } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import { CircularProgress } from '@rmwc/circular-progress';
import styles from './index.module.css';
import Trend from '../../components/trend';
import WorldTrend from '../../components/world-trend';
import TopCountries from './top-countries';
import GlobalTrend from './global-trend';
import { useDailyData, useConfirmData, useOverallData } from '../../hooks/data';

const { SuspenseList } = React as any;

const Index: React.FC<{}> = () => {
  useDailyData({
    suspense: false,
  });
  useConfirmData({
    suspense: false,
  });
  useOverallData({
    suspense: false,
  });
  return (
    <div>
      <Typography className={styles.title} use="headline5">Global Trend</Typography>
      <SuspenseList revealOrder="forwards" tail="collapsed">
        <React.Suspense
          fallback={(
            <div className={styles.spinnerWrapper}>
              <CircularProgress size="large" />
            </div>
          )}
        >
          <GlobalTrend />
        </React.Suspense>
        <React.Suspense
          fallback={(
            <div className={styles.spinnerWrapper}>
              <CircularProgress size="large" />
            </div>
          )}
        >
          <Grid>
            <GridRow>
              <GridCell desktop={6}>
                <Card className={styles.trendCard}>
                  <Trend />
                </Card>
              </GridCell>
              <GridCell desktop={6}>
                <Card className={styles.trendCard}>
                  <WorldTrend />
                </Card>
              </GridCell>
            </GridRow>
          </Grid>
        </React.Suspense>
        <Typography className={styles.title} use="headline5">Top Countries</Typography>
        <React.Suspense
          fallback={(
            <div className={styles.spinnerWrapper}>
              <CircularProgress size="large" />
            </div>
          )}
        >
          <TopCountries />
        </React.Suspense>
      </SuspenseList>
    </div>
  );
};

export default Index;
