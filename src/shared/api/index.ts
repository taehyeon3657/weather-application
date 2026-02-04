import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    units: 'metric',
    lang: 'kr',
  },
});
