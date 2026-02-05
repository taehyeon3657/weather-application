import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { CurrentWeather } from '../model/types';

import { getWeather } from '../api/weather.service';
import { weatherKeys } from './queryKey';

export function useCurrentWeatherQuery(
  lat: number,
  lon: number,
  options?: Omit<UseQueryOptions<CurrentWeather, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: weatherKeys.current(lat, lon),
    queryFn: () => getWeather(lat, lon),
    enabled: !!lat && !!lon,
    ...options,
  });
}
