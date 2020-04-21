import React from 'react';
import { Grid, GridRow, GridCell } from '@rmwc/grid';
import { Card, CardPrimaryAction } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import CountUp from 'react-countup';
import classnames from 'classnames';
import { useDailyData, useOverallData } from '../../../hooks/data';
import { getNumericSign } from '../../../utils/fetch';
import styles from './index.module.css';

const GlobalTrend: React.FC<{}> = () => {
  const { data: dailyData } = useDailyData();
  const { data: recoveryData } = useOverallData();
  const currentDateData = dailyData?.[dailyData.length - 1];
  const prevDateData = dailyData?.[dailyData.length - 2];
  const confirmedDelta = currentDateData.confirmed.total - prevDateData.confirmed.total;
  const deathsDelta = currentDateData.deaths.total - prevDateData.deaths.total;

  return (
    <Grid>
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
    </Grid>
  );
};


export default GlobalTrend;
