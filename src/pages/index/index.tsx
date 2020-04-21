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

const Index: React.FC<{}> = () => (
  <div>
    <Typography className={styles.title} use="headline5">Global Trend</Typography>
    <React.Suspense
      fallback={(
        <div className={styles.spinnerWrapper}>
          <CircularProgress size="large" />
        </div>
      )}
    >
      <GlobalTrend />
    </React.Suspense>
    <Grid>
      <GridRow>
        <GridCell desktop={6}>
          <Card className={styles.trendCard}>
            <React.Suspense
              fallback={(
                <div className={styles.spinnerWrapper}>
                  <CircularProgress size="large" />
                </div>
              )}
            >
              <Trend />
            </React.Suspense>
          </Card>
        </GridCell>
        <GridCell desktop={6}>
          <Card className={styles.trendCard}>
            <React.Suspense
              fallback={(
                <div className={styles.spinnerWrapper}>
                  <CircularProgress size="large" />
                </div>
              )}
            >
              <WorldTrend />
            </React.Suspense>
          </Card>
        </GridCell>
      </GridRow>
    </Grid>
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
  </div>

);

export default Index;
