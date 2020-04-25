import React from 'react';
import { Grid, GridRow, GridCell } from '@rmwc/grid';
import { Card, CardPrimaryAction } from '@rmwc/card';
import { Link } from 'react-router-dom';
import { Typography } from '@rmwc/typography';
import CountUp from 'react-countup';
import classnames from 'classnames';
import styles from './index.module.css';
import { getNumericSign } from '../../../utils/fetch';
import { useConfirmedDataByCountry } from '../../../hooks/data';

const TopCountries: React.FC<{}> = () => {
  const { data: countryData } = useConfirmedDataByCountry();

  return (
    <Grid>
      <GridRow>
        {
          countryData.slice(0, 9).map(({
            country,
            confirmed,
            deltaConfirmed,
            deltaDeaths,
            deltaRecovered,
            deaths,
            recovered,
            iso2,
          }) => (
            <GridCell desktop={3} phone={4} key={country}>
              <Card className={classnames(styles.card, styles.countryCard)}>
                <CardPrimaryAction>
                  <Link to={`/countries/${country}`}>
                    <Typography use="subtitle1" className={styles.countryRow}>
                      <img src={`https://www.countryflags.io/${iso2}/flat/16.png`} alt={country} />
                      {country}
                    </Typography>
                    <Typography use="body2">
                      <Grid className={styles.countryCardRow}>
                        <GridRow>
                          <GridCell desktop={5} phone={2}>
                            <Typography use="caption" className={styles.rowLabel}>
                              confirmed:&nbsp;
                            </Typography>
                          </GridCell>
                          <GridCell className={styles.rowItem} desktop={7} phone={2}>
                            <CountUp
                              start={0}
                              end={confirmed}
                              duration={2.75}
                              separator=","
                            />
                            <span className={styles.deltaConfirmed}>
                              &nbsp;
                              {
                                  getNumericSign(deltaConfirmed)
                                }
                              <CountUp
                                start={0}
                                end={deltaConfirmed}
                                duration={2.75}
                                separator=","
                              />

                            </span>
                          </GridCell>
                        </GridRow>
                      </Grid>

                      <Grid className={styles.countryCardRow}>
                        <GridRow>
                          <GridCell desktop={5} phone={2}>
                            <Typography use="caption" className={styles.rowLabel}>
                              deaths:&nbsp;
                            </Typography>
                          </GridCell>
                          <GridCell className={styles.rowItem} desktop={7} phone={2}>
                            <CountUp

                              start={0}
                              end={deaths}
                              duration={2.75}
                              separator=","
                            />
                            <span className={styles.deltaDeaths}>
                              &nbsp;
                              {
                                  getNumericSign(deltaDeaths)
                                }
                              <CountUp
                                start={0}
                                end={deltaDeaths}
                                duration={2.75}
                                separator=","
                              />

                            </span>
                          </GridCell>
                        </GridRow>
                      </Grid>
                      <Grid className={styles.countryCardRow}>
                        <GridRow>
                          <GridCell desktop={5} phone={2}>
                            <Typography use="caption" className={styles.rowLabel}>
                              recovered:&nbsp;
                            </Typography>
                          </GridCell>
                          <GridCell className={styles.rowItem} desktop={7} phone={2}>
                            <CountUp

                              start={0}
                              end={recovered}
                              duration={2.75}
                              separator=","
                            />
                            <span className={styles.deltaRecovered}>
                              &nbsp;
                              {
                                  getNumericSign(deltaRecovered)
                                }
                              <CountUp
                                start={0}
                                end={deltaRecovered}
                                duration={2.75}
                                separator=","
                              />

                            </span>
                          </GridCell>
                        </GridRow>
                      </Grid>
                    </Typography>
                  </Link>
                </CardPrimaryAction>
              </Card>
            </GridCell>
          ))
        }
        <GridCell desktop={3} phone={4}>
          <Card className={classnames(styles.card, styles.countryCard)}>
            <CardPrimaryAction>
              <Link to="/countries">More...</Link>
            </CardPrimaryAction>
          </Card>
        </GridCell>
      </GridRow>
    </Grid>
  );
};

export default TopCountries;
