import useSWR, { ConfigInterface } from 'swr';
import React from 'react';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import sum from 'lodash/sum';
import moment from 'moment';
import { fetcher } from '../utils/fetch';

function useDailyData(config: ConfigInterface = {}) {
  return useSWR('/api/daily', fetcher, { suspense: true, ...config });
}

function useDailyDetailsData(date: string, config: ConfigInterface = {}) {
  return useSWR(`/api/daily/${date}`, fetcher, { suspense: true, ...config });
}

function useOverallData(config: ConfigInterface = {}) {
  return useSWR('/api', fetcher, { suspense: true, ...config });
}

function useConfirmData(config: ConfigInterface = {}) {
  return useSWR('/api/confirmed', fetcher, { suspense: true, ...config });
}

function useCountryConfirmData(iso3: string, config: ConfigInterface = {}) {
  return useSWR(`/api/countries/${iso3}/confirmed`, fetcher, { suspense: true, ...config });
}

function useCountries(config: ConfigInterface = {}) {
  return useSWR<{
    countries: {
      name: string;
      iso2: string;
      iso3: string;
    }[]
  }>('/api/countries', fetcher, { suspense: true, ...config });
}

function groupDailyDateByField(confirmedData: any, field: string) {
  const groupedDailyDate = toPairs(groupBy(confirmedData, field)).map(([, list]) => {
    const confirmed = sum(list.map((data) => +data.confirmed));
    const recovered = sum(list.map((data) => +data.recovered));
    const deaths = sum(list.map((data) => +data.deaths));

    return {
      [field]: list?.[0]?.[field],
      list,
      confirmed,
      recovered,
      deaths,
      lastUpdate: list?.[0]?.lastUpdate,
    };
  });

  const total = {
    [field]: 'Total',
    list: [],
    confirmed: sum(confirmedData.map((data: any) => +data.confirmed)),
    recovered: sum(confirmedData.map((data: any) => +data.recovered)),
    deaths: sum(confirmedData.map((data: any) => +data.deaths)),
    lastUpdate: confirmedData?.[0]?.lastUpdate,
  };

  return {
    list: groupedDailyDate,
    total,
  };
}

function useConfirmedDataByCountry(config: ConfigInterface = {}) {
  const prevDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
  const { data: confirmedData, ...rest } = useConfirmData(config);
  const { data: prevConfirmedData } = useDailyDetailsData(prevDate, config);

  const normalizedData = React.useMemo(() => {
    if (!confirmedData || !prevConfirmedData) {
      return [];
    }

    const prevDailyData = groupDailyDateByField(prevConfirmedData, 'countryRegion');

    return toPairs(groupBy(confirmedData, 'countryRegion')).map(([country, list]) => {
      let deltaConfirmed: number;
      let deltaRecovered: number;
      let deltaDeaths: number;
      const prevCountryData = prevDailyData.list
        .find((prevItem) => prevItem.countryRegion === country);
      const confirmed = sum(list.map((data) => +data.confirmed));
      const recovered = sum(list.map((data) => +data.recovered));
      const deaths = sum(list.map((data) => +data.deaths));
      const active = sum(list.map((data) => +data.active));

      if (prevCountryData) {
        deltaConfirmed = +confirmed - (+prevCountryData.confirmed);
        deltaRecovered = +recovered - (+prevCountryData.recovered);
        deltaDeaths = +deaths - (+prevCountryData.deaths);
      } else {
        deltaConfirmed = +confirmed;
        deltaRecovered = +recovered;
        deltaDeaths = +deaths;
      }

      return {
        country,
        list,
        confirmed,
        recovered,
        deaths,
        active,
        deltaConfirmed,
        deltaRecovered,
        deltaDeaths,
        iso3: list?.[0]?.iso3,
        iso2: list?.[0]?.iso2,
        countryRegion: list?.[0]?.countryRegion,
      };
    });
  }, [confirmedData, prevConfirmedData]);

  return {
    data: normalizedData,
    ...rest,
  };
}

function useDailyDataByCountry(date: string, config: ConfigInterface = {}) {
  const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  const { data: confirmedData, ...rest } = useDailyDetailsData(date, config);
  const { data: prevConfirmedData } = useDailyDetailsData(prevDate, config);

  const normalizedData = React.useMemo(() => {
    if (!confirmedData || !prevDate) {
      return [];
    }

    const dailyData = groupDailyDateByField(confirmedData, 'countryRegion');
    const prevDailyData = groupDailyDateByField(prevConfirmedData, 'countryRegion');

    return dailyData.list.map((item) => {
      let deltaConfirmed: number;
      let deltaRecovered: number;
      let deltaDeaths: number;
      const prevCountryData = prevDailyData.list
        .find((prevItem) => prevItem.countryRegion === item.countryRegion);

      if (prevCountryData) {
        deltaConfirmed = +item.confirmed - (+prevCountryData.confirmed);
        deltaRecovered = +item.recovered - (+prevCountryData.recovered);
        deltaDeaths = +item.deaths - (+prevCountryData.deaths);
      } else {
        deltaConfirmed = +item.confirmed;
        deltaRecovered = +item.recovered;
        deltaDeaths = +item.deaths;
      }

      return {
        deltaConfirmed,
        deltaRecovered,
        deltaDeaths,
        countryRegion: item.countryRegion,
        confirmed: item.confirmed,
        recovered: item.recovered,
        deaths: item.deaths,
        ...item,
      };
    });
  }, [confirmedData, prevDate, prevConfirmedData]);

  return {
    data: normalizedData,
    ...rest,
  };
}

function useDailyDataByState(country: string, date: string, config: ConfigInterface = {}) {
  const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  const { data: confirmedData, ...rest } = useDailyDetailsData(date, config);
  const { data: prevConfirmedData } = useDailyDetailsData(prevDate, config);

  const normalizedData = React.useMemo(() => {
    if (!confirmedData || !prevDate) {
      return {
        list: null,
        total: null,
      };
    }

    const dailyData = groupDailyDateByField(confirmedData.filter((item: any) => item.countryRegion === country), 'provinceState');
    const prevDailyData = groupDailyDateByField(prevConfirmedData.filter((item: any) => item.countryRegion === country), 'provinceState');

    const list = dailyData.list.map((item) => {
      let deltaConfirmed: number;
      let deltaRecovered: number;
      let deltaDeaths: number;
      const prevCountryData = prevDailyData.list
        .find((prevItem) => prevItem.provinceState === item.provinceState);

      if (prevCountryData) {
        deltaConfirmed = +item.confirmed - (+prevCountryData.confirmed);
        deltaRecovered = +item.recovered - (+prevCountryData.recovered);
        deltaDeaths = +item.deaths - (+prevCountryData.deaths);
      } else {
        deltaConfirmed = +item.confirmed;
        deltaRecovered = +item.recovered;
        deltaDeaths = +item.deaths;
      }

      return {
        deltaConfirmed,
        deltaRecovered,
        deltaDeaths,
        provinceState: item.provinceState,
        confirmed: item.confirmed,
        recovered: item.recovered,
        deaths: item.deaths,
        ...item,
      };
    });
    const total = {
      ...dailyData.total,
      deltaConfirmed: +dailyData.total.confirmed - (+prevDailyData.total.confirmed),
      deltaRecovered: +dailyData.total.recovered - (+prevDailyData.total.recovered),
      deltaDeaths: +dailyData.total.deaths - (+prevDailyData.total.deaths),
    };

    return {
      list, total,
    };
  }, [confirmedData, prevDate, prevConfirmedData, country]);

  return {
    data: normalizedData,
    ...rest,
  };
}

function useConfirmedDataByState(iso3: string, date: string, config: ConfigInterface = {}) {
  const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  const { data: confirmedData, ...rest } = useDailyDetailsData(date, config);
  const { data: prevConfirmedData } = useDailyDetailsData(prevDate, config);

  const normalizedData = React.useMemo(() => {
    if (!confirmedData || !prevDate) {
      return {
        list: null,
        total: null,
      };
    }

    const confirmedCountryData = confirmedData.filter((item: any) => item.countryRegion === iso3);
    const prevConfirmedCountryData = prevConfirmedData
      .filter((item: any) => item.countryRegion === iso3);
    const dailyData = groupDailyDateByField(confirmedCountryData, 'provinceState');
    const prevDailyData = groupDailyDateByField(prevConfirmedCountryData, 'provinceState');

    const list: any[] = dailyData.list.map((item) => {
      let deltaConfirmed: number;
      let deltaRecovered: number;
      let deltaDeaths: number;
      const prevCountryData = prevDailyData.list
        .find((prevItem) => prevItem.provinceState === item.provinceState);

      if (prevCountryData) {
        deltaConfirmed = +item.confirmed - (+prevCountryData.confirmed);
        deltaRecovered = +item.recovered - (+prevCountryData.recovered);
        deltaDeaths = +item.deaths - (+prevCountryData.deaths);
      } else {
        deltaConfirmed = +item.confirmed;
        deltaRecovered = +item.recovered;
        deltaDeaths = +item.deaths;
      }

      return {
        deltaConfirmed,
        deltaRecovered,
        deltaDeaths,
        provinceState: item.provinceState,
        ...item,
      };
    });

    const total = {
      ...dailyData.total,
      deltaConfirmed: +dailyData.total.confirmed - (+prevDailyData.total.confirmed),
      deltaRecovered: +dailyData.total.recovered - (+prevDailyData.total.recovered),
      deltaDeaths: +dailyData.total.deaths - (+prevDailyData.total.deaths),
    };

    return {
      list, total,
    };
  }, [confirmedData, prevDate, prevConfirmedData, iso3]);

  return {
    data: normalizedData,
    ...rest,
  };
}

export {
  useConfirmedDataByCountry,
  useDailyData,
  useOverallData,
  useConfirmData,
  useCountryConfirmData,
  useConfirmedDataByState,
  useDailyDetailsData,
  useDailyDataByCountry,
  useCountries,
  useDailyDataByState,
};
