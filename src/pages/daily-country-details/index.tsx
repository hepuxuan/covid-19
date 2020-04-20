import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb';
import styles from './index.module.css';

const DailyCountryDetails: React.FC<{}> = () => {
  const match = useRouteMatch<{ date: string, country: string }>();
  return (
    <div className={styles.pageWrapper}>
      <Breadcrumb>
        <Link to="/daily-trend">Stats By Countries</Link>
        <Link to={`/daily-trend/${match.params.date}`}>{match.params.date}</Link>
        <span>{match.params.country}</span>
      </Breadcrumb>
      <div>Coming Soon</div>
    </div>
  );
};

export default DailyCountryDetails;
