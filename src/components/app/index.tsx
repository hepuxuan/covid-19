import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { GridCell, Grid, GridRow } from '@rmwc/grid';
import { CircularProgress } from '@rmwc/circular-progress';
import ErrorBoundary from 'react-error-boundary';
import { RMWCProvider } from '@rmwc/provider';
import routes from '../../routes';
import icon from './virus.svg';
import styles from './index.module.css';

import 'normalize.css';
import './mdc';
import SomethingIsWrong from '../error';

function App() {
  return (
    <BrowserRouter>
      <RMWCProvider
        typography={{
          defaultTag: 'div',
          headline1: 'h1',
          headline2: 'h2',
          headline3: 'h3',
          headline4: 'h4',
          headline5: 'h5',
        }}
      >
        <SimpleTopAppBar
          title={
            (
              <Link to="/">
                <img className={styles.icon} src={icon} alt="icon" />
              </Link>
            ) as any
          }
          startContent={(
            <Grid align="left">
              <GridRow>
                <GridCell phone={2}><Link className={styles.link} to="/countries">Countries</Link></GridCell>
                <GridCell phone={2}><Link className={styles.link} to="/daily-trend">Daily Trend</Link></GridCell>
              </GridRow>
            </Grid>
          )}
        />
        <TopAppBarFixedAdjust />
        <div className={styles.safeArea}>
          <ErrorBoundary FallbackComponent={SomethingIsWrong}>
            <React.Suspense fallback={(
              <div className={styles.spinnerWrapper}>
                <CircularProgress size="large" />
              </div>
            )}
            >
              <Switch>
                {
                  routes.map((props) => (
                    <Route key={props.path} path={props.path} exact={props.exact}>
                      <props.component />
                    </Route>
                  ))
                }
              </Switch>
            </React.Suspense>
          </ErrorBoundary>
        </div>
      </RMWCProvider>
    </BrowserRouter>
  );
}

export default App;
