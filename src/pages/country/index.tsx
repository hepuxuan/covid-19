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
import moment from 'moment';
import styles from './index.module.css';
import Breadcrumb from '../../components/breadcrumb';
import { useConfirmedDataByState } from '../../hooks/data';
import { getNumericSign } from '../../utils/fetch';

const Country: React.FC<{}> = () => {
  const match = useRouteMatch<{ country: string }>();
  const { data } = useConfirmedDataByState(match.params.country, moment().subtract(1, 'days').format('YYYY-MM-DD'));

  return (
    <div className={styles.pageWrapper}>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <Link to="/countries">Stats By Country</Link>
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
              data.map(({
                provinceState,
                confirmed,
                recovered,
                deaths,
                deltaConfirmed,
                deltaRecovered,
                deltaDeaths,
              }) => (
                <DataTableRow key={provinceState}>
                  <DataTableCell>
                    <span className={styles.stateCell}>{provinceState === 'null' ? '--' : provinceState}</span>
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

export default Country;
