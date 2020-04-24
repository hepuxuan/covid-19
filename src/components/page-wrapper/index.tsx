import React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';
import styles from './index.module.css';

const PageWrapper: React.FC<{
  fallback?: React.ReactNode,
  prefetch?: () => void,
}> = ({
  children, fallback = (
    <div className={styles.spinnerWrapper}>
      <CircularProgress size="large" />
    </div>
  ),
  prefetch = () => { },
}) => {
  prefetch();
  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );
};

export default PageWrapper;
