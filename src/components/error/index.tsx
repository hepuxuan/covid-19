import React from 'react';
import styles from './index.module.css';

const SomethingIsWrong: React.FC<{}> = () => (
  <div className={styles.error}>
    Opps, Something is wrong, please refresh the page later.
  </div>
);

export default SomethingIsWrong;
