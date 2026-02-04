import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    units: 'metric',
    lang: 'kr',
  },
});
