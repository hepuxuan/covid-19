import React from 'react';
import { CardPrimaryAction, Card } from '@rmwc/card';
import { GridCell, Grid, GridRow } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import CountUp from 'react-countup';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import Trend from '../../components/trend';
import WorldTrend from '../../components/world-trend';
import { useConfirmedDataByCountry, useDailyData, useOverallData } from '../../hooks/data';
import { getNumericSign } from '../../utils/fetch';

// function getActiveCase(data: any) {
//   return data.confirmed.total - (data.recovered.total + data.deaths.total);
// }

const Index: React.FC<{}> = () => {
  const { data: recoveryData } = useOverallData();
  const { data: dailyData } = useDailyData();
  const { data: countryData } = useConfirmedDataByCountry();

  const currentDateData = dailyData?.[dailyData?.length - 1];

  const prevDateData = dailyData?.[dailyData?.length - 2];

  // const activeDelta = getActiveCase(currentDateData) - getActiveCase(prevDateData);
  const confirmedDelta = currentDateData.confirmed.total - prevDateData.confirmed.total;
  const deathsDelta = currentDateData.deaths.total - prevDateData.deaths.total;
  // const recoveredDelta = currentDateData.recovered.total - prevDateData.recovered.total;

  return (
    <Grid>
      <GridRow>
        <GridCell><Typography use="headline5" tag="h3">Global Trend</Typography></GridCell>
      </GridRow>
      <GridRow>
        <GridCell phone={2} desktop={3}>
          <Card className={classnames(styles.card, styles.activeCard)}>
            <CardPrimaryAction>
              <Typography use="subtitle2">Active</Typography>
              <Typography use="body1">
                <CountUp
                  start={0}
                  end={currentDateData.confirmed.total
                    - (currentDateData.deaths.total + recoveryData.recovered.value)}
                  duration={2.75}
                  separator=","
                />
              </Typography>
            </CardPrimaryAction>
          </Card>
        </GridCell>
        <GridCell phone={2} desktop={3}>
          <Card className={classnames(styles.card, styles.confirmCard)}>
            <CardPrimaryAction>
              <Typography use="subtitle2">Confirmed</Typography>
              <Typography use="body1">
                <CountUp start={0} end={currentDateData.confirmed.total} duration={2.75} separator="," />
              </Typography>
              <Typography use="caption">
                {getNumericSign(confirmedDelta)}
                <CountUp start={0} end={confirmedDelta} duration={2.75} separator="," />
              </Typography>
            </CardPrimaryAction>
          </Card>
        </GridCell>
        <GridCell phone={2} desktop={3}>
          <Card className={classnames(styles.card, styles.deathCard)}>
            <Typography use="subtitle2">Death</Typography>
            <Typography use="body1">
              <CountUp start={0} end={currentDateData.deaths.total} duration={2.75} separator="," />
            </Typography>
            <Typography use="caption">
              {getNumericSign(deathsDelta)}
              <CountUp start={0} end={deathsDelta} duration={2.75} separator="," />
            </Typography>
          </Card>
        </GridCell>
        <GridCell phone={2} desktop={3}>
          <Card className={classnames(styles.card, styles.recoverdCard)}>
            <Typography use="subtitle2">Recovered</Typography>
            <Typography use="body1">
              <CountUp start={0} end={recoveryData.recovered.value} duration={2.75} separator="," />
            </Typography>
          </Card>
        </GridCell>
      </GridRow>
      <GridRow className={styles.charts}>
        <GridCell desktop={6}>
          <Card className={styles.trendCard}>
            <Trend />
          </Card>
        </GridCell>
        <GridCell desktop={6}>
          <Card className={styles.trendCard}>
            <WorldTrend />
          </Card>
        </GridCell>
      </GridRow>
      <GridRow>
        <GridCell><Typography use="headline5" tag="h3">Top Countries</Typography></GridCell>
      </GridRow>
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
            iso3,
            iso2,
          }) => (
            <GridCell desktop={3} phone={4} key={country}>
              <Card className={classnames(styles.card, styles.countryCard)}>
                <CardPrimaryAction>
                  <Link to={`/countries/${iso3}`}>
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

export default Index;
