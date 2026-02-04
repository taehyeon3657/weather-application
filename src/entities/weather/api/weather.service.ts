import { weatherApi } from '@/shared/api';
import type { CurrentWeather, WeatherForecast } from '../model/types';

export const getWeather = async (lat: number, lon: number): Promise<CurrentWeather> => {
  const { data } = await weatherApi.get<CurrentWeather>('/weather', {
    params: { lat, lon },
  });
  return data;
};

export const getForecast = async (lat: number, lon: number): Promise<WeatherForecast> => {
  const { data } = await weatherApi.get<WeatherForecast>('/forecast', {
    params: { lat, lon },
  });
  return data;
};
