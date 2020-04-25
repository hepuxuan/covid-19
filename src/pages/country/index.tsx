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
import { Grid, GridRow, GridCell } from '@rmwc/grid';
import styles from './index.module.css';
import Breadcrumb from '../../components/breadcrumb';
import { useConfirmedDataByState } from '../../hooks/data';
import { getNumericSign } from '../../utils/fetch';

const Country: React.FC<{}> = () => {
  const match = useRouteMatch<{ country: string }>();
  const { data } = useConfirmedDataByState(match.params.country, moment().subtract(1, 'days').format('YYYY-MM-DD'));

  return (
    <Grid>
      <GridRow>
        <GridCell span={12}>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <Link to="/countries">Stats By Country</Link>
            <span>{match.params.country}</span>
          </Breadcrumb>
        </GridCell>
      </GridRow>
      <GridRow>
        <GridCell span={12}>
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
        </GridCell>
      </GridRow>
    </Grid>
  );
};

export default Country;
