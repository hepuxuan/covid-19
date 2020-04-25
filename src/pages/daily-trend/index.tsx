import React from 'react';
import { Grid, GridRow, GridCell } from '@rmwc/grid';
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
  DataTableBody,
} from '@rmwc/data-table';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from '@rmwc/button';
import styles from './index.module.css';
import Trend from '../../components/trend';
import Breadcrumb from '../../components/breadcrumb';
import { useDailyData } from '../../hooks/data';

const DailyTrend: React.FC<{}> = () => {
  const { data: dailyData } = useDailyData();
  const sortedDailyData = React.useMemo(() => dailyData.sort(
    (a: any, b: any) => moment(b.reportDate).toDate().valueOf()
      - moment(a.reportDate).toDate().valueOf(),
  ), [dailyData]);

  return (
    <Grid>
      <GridRow>
        <GridCell span={12}>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>Daily Trend</span>
          </Breadcrumb>
        </GridCell>
      </GridRow>
      <GridRow className={styles.mainContent}>
        <GridCell span={8}>
          <DataTable stickyColumns={1} stickyRows={1} className={styles.trendTable}>
            <DataTableContent>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeadCell>Date</DataTableHeadCell>
                  <DataTableHeadCell isNumeric>Total Confirmed</DataTableHeadCell>
                  <DataTableHeadCell isNumeric>New Cases</DataTableHeadCell>
                  <DataTableHeadCell isNumeric>Total Deaths</DataTableHeadCell>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {
                  sortedDailyData.map(({
                    reportDate, deltaConfirmed, deaths, totalConfirmed,
                  }: any) => (
                    <DataTableRow key={reportDate}>
                      <DataTableCell>
                        <Link to={`/daily-trend/${reportDate}`}>
                          <Button dense>{reportDate}</Button>
                        </Link>
                      </DataTableCell>
                      <DataTableCell isNumeric>{totalConfirmed?.toLocaleString()}</DataTableCell>
                      <DataTableCell isNumeric>{deltaConfirmed?.toLocaleString()}</DataTableCell>
                      <DataTableCell isNumeric>{deaths?.total?.toLocaleString()}</DataTableCell>
                    </DataTableRow>
                  ))
                }
              </DataTableBody>
            </DataTableContent>
          </DataTable>
        </GridCell>
        <GridCell span={4}>
          <Trend dailyData={dailyData} height={300} />
        </GridCell>
      </GridRow>
    </Grid>
  );
};

export default DailyTrend;
