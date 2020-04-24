import moment from 'moment';
import {
  useDailyData, useOverallData, useConfirmData, useDailyDetailsData,
} from '../../hooks/data';

function usePrefetch() {
  useDailyData({
    suspense: false,
  });
  useConfirmData({
    suspense: false,
  });
  useOverallData({
    suspense: false,
  });
  useDailyDetailsData(moment().subtract(2, 'days').format('YYYY-MM-DD'), {
    suspense: false,
  });
}

export default usePrefetch;
