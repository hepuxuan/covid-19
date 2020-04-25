import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell,
} from '@rmwc/data-table';
import Breadcrumb from '../../components/breadcrumb';
import styles from './index.module.css';
import { useDailyDataByState } from '../../hooks/data';
import { getNumericSign } from '../../utils/fetch';

const DailyCountryDetails: React.FC<{}> = () => {
  const match = useRouteMatch<{ date: string, country: string }>();
  const { data } = useDailyDataByState(match.params.country, match.params.date);
  return (
    <div className={styles.pageWrapper}>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <Link to="/daily-trend">Daily Trend</Link>
        <Link to={`/daily-trend/${match.params.date}`}>{match.params.date}</Link>
        <span>{match.params.country}</span>
      </Breadcrumb>
      <DataTable stickyColumns={1} stickyRows={1} className={styles.countryTable}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>
                <span className={styles.stateCell}>State/Province</span>
              </DataTableHeadCell>
              <DataTableHeadCell isNumeric>Confirmed</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Recovered</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Deaths</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {
              data.list?.map(({
                provinceState,
                confirmed,
                recovered,
                deaths,
                deltaConfirmed,
                deltaRecovered,
                deltaDeaths,
              }: any) => (
                <DataTableRow key={provinceState}>
                  <DataTableCell>
                    <span className={styles.stateCell}>{provinceState || 'Unknown'}</span>
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
            <DataTableRow>
              <DataTableCell>
                <span className={styles.stateCell}>Total</span>
              </DataTableCell>
              <DataTableCell isNumeric>
                {data.total?.confirmed.toLocaleString()}
                &nbsp;
                <span className={styles.deltaConfirmed}>
                  (
                  {getNumericSign(data.total?.deltaConfirmed)}
                  {data.total?.deltaConfirmed.toLocaleString()}
                  )
                </span>
              </DataTableCell>
              <DataTableCell isNumeric>
                {data.total?.recovered.toLocaleString()}
                &nbsp;
                <span className={styles.deltaRecovered}>
                  (
                  {getNumericSign(data.total?.deltaRecovered)}
                  {data.total?.deltaRecovered.toLocaleString()}
                  )
                </span>
              </DataTableCell>
              <DataTableCell isNumeric>
                {data.total?.deaths.toLocaleString()}
                &nbsp;
                <span className={styles.deltaDeaths}>
                  (
                  {getNumericSign(data.total?.deltaDeaths)}
                  {data.total?.deltaDeaths.toLocaleString()}
                  )
                </span>
              </DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </div>
  );
};

export default DailyCountryDetails;
