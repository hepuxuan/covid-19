import React from 'react';
import Trend from '../../../components/trend';
import { useDailyData } from '../../../hooks/data';

const TrendChart: React.FC<{}> = () => {
  const { data: dailyData } = useDailyData();
  return (
    <Trend dailyData={dailyData} />
  );
};

export default TrendChart;
