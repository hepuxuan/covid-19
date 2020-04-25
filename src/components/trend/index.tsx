import React from 'react';
import Measure from 'react-measure';
import { Chart } from '@antv/g2';
import { Card } from '@rmwc/card';
import styles from './index.module.css';

const container = 'trend-chart';

const Trend: React.FC<{
  height?: number,
  dailyData: {
    totalConfirmed: number;
    deaths: number;
    reportDate: string;
  }[]
}> = ({ height, dailyData }) => {
  const [width, setWidth] = React.useState<number>();
  const [hasRendered, setHasRendered] = React.useState(false);
  const canvasHeight = height ?? (width ? (width / 971) * 800 : 0);
  React.useEffect(() => {
    if (!dailyData || !width || hasRendered) {
      return;
    }
    const chart = new Chart({
      container,
      autoFit: true,
      height: canvasHeight,
    });
    setHasRendered(true);
    chart.data([
      ...dailyData.map(({ totalConfirmed, reportDate }: any) => ({
        number: totalConfirmed, reportDate, type: 'total confirmed',
      })),
      ...dailyData.map(({ reportDate, deaths }: any) => ({
        reportDate, number: deaths.total, type: 'total deaths',
      })),
    ]);
    chart.scale({
      reportDate: {
        range: [0, 1],
        sync: true,
      },
      totalConfirmed: {
        min: 0,
        nice: true,
        sync: true,
      },
      deaths: {
        min: 0,
        nice: true,
        sync: true,
      },
    });
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });
    chart.line().position('reportDate*number').shape('smooth').color('type', (val) => {
      if (val === 'total confirmed') {
        return 'blue';
      }

      return 'red';
    });

    chart.render();
  }, [dailyData, width, hasRendered, canvasHeight]);

  return (
    <Card className={styles.trendCard} style={{ height: canvasHeight + 40 }}>
      <Measure
        bounds
        onResize={(contentRect) => {
          if (contentRect.bounds) {
            setWidth(contentRect.bounds.width);
          }
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} id={container} />
        )}
      </Measure>
    </Card>
  );
};

export default Trend;
