import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  DataTable,
  DataTableHead,
  DataTableHeadCell,
  DataTableCell,
  DataTableContent,
  DataTableRow,
  DataTableBody,
} from '@rmwc/data-table';
import { Button } from '@rmwc/button';
import styles from './index.module.css';
import Breadcrumb from '../../components/breadcrumb';
import { useDailyDataByCountry } from '../../hooks/data';
import { getNumericSign } from '../../utils/fetch';

const DailyDetails: React.FC<{}> = () => {
  const match = useRouteMatch<{ date: string }>();
  const { data } = useDailyDataByCountry(match.params.date);

  return (
    <div className={styles.pageWrapper}>
      <Breadcrumb>
        <Link to="/daily-trend">Stats By Countries</Link>
        <span>{match.params.date}</span>
      </Breadcrumb>
      <DataTable stickyColumns={1} stickyRows={1} className={styles.dailyTable}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>
                <span className={styles.countryCell}>
                  Country/Region
                </span>
              </DataTableHeadCell>
              <DataTableHeadCell isNumeric>Confirmed</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Recovered</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Deaths</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {
              data.map(({
                countryRegion,
                confirmed,
                recovered,
                deaths,
                deltaConfirmed,
                deltaDeaths,
                deltaRecovered,
              }) => (
                <DataTableRow key={countryRegion}>
                  <DataTableCell className={styles.countryCell}>
                    <Link to={`/daily-trend/${match.params.date}/${countryRegion}`}>
                      <Button>{countryRegion}</Button>
                    </Link>
                  </DataTableCell>
                  <DataTableCell isNumeric>
                    {confirmed.toLocaleString()}
                    &nbsp;
                    <span className={styles.deltaConfirmed}>
                      (
                      {getNumericSign(deltaConfirmed)}
                      {deltaConfirmed.toLocaleString()}
                      )
                    </span>
                  </DataTableCell>
                  <DataTableCell isNumeric>
                    {recovered.toLocaleString()}
                    &nbsp;
                    <span className={styles.deltaRecovered}>
                      (
                      {getNumericSign(deltaRecovered)}
                      {deltaRecovered.toLocaleString()}
                      )
                    </span>
                  </DataTableCell>
                  <DataTableCell isNumeric>
                    {deaths.toLocaleString()}
                    &nbsp;
                    <span className={styles.deltaDeaths}>
                      (
                      {getNumericSign(deltaDeaths)}
                      {deltaDeaths.toLocaleString()}
                      )
                    </span>
                  </DataTableCell>
                </DataTableRow>
              ))
            }
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </div>
  );
};

export default DailyDetails;
