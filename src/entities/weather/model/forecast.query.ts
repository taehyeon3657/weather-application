import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { WeatherForecast } from './types';
import { getForecast } from '../api/weather.service';
import { weatherKeys } from './queryKey';

export function useForecastQuery(
  lat: number,
  lon: number,
  options?: Omit<UseQueryOptions<WeatherForecast, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: weatherKeys.forecast(lat, lon),
    queryFn: () => getForecast(lat, lon),
    enabled: !!lat && !!lon,
    ...options,
  });
}
