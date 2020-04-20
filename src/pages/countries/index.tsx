import React from 'react';
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableHeadCell,
  DataTableBody,
  DataTableRow,
  DataTableCell,
} from '@rmwc/data-table';
import { Button } from '@rmwc/button';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { useConfirmedDataByCountry } from '../../hooks/data';
import Breadcrumb from '../../components/breadcrumb';
import { getNumericSign } from '../../utils/fetch';

const Countries: React.FC<{}> = () => {
  const { data } = useConfirmedDataByCountry();

  return (
    <div className={styles.pageWrapper}>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <span>Stats By Country</span>
      </Breadcrumb>
      <DataTable stickyColumns={1} stickyRows={1} className={styles.countryTable}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell className={styles.countryCell}>Country</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Confirmed</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Recovered</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Deaths</DataTableHeadCell>
              <DataTableHeadCell isNumeric>Active</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {
              data.map(({
                country,
                confirmed,
                recovered,
                deaths,
                active,
                countryRegion,
                iso2,
                deltaConfirmed,
                deltaDeaths,
                deltaRecovered,
              }) => (
                <DataTableRow key={country}>
                  <DataTableCell className={styles.countryCell}>
                    <Link to={`/countries/${countryRegion}`}>
                      <img className={styles.countryFlag} src={`https://www.countryflags.io/${iso2}/flat/16.png`} alt="" />
                      <Button dense>
                        {country}
                      </Button>
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
                  <DataTableCell isNumeric>{active.toLocaleString()}</DataTableCell>
                </DataTableRow>
              ))
            }
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </div>
  );
};

export default Countries;
