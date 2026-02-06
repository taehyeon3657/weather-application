'use client';

import { useCurrentWeatherQuery } from '@/entities/weather/model/weather.query';
import { useForecastQuery } from '@/entities/weather/model/forecast.query';
import { HourlyForecastItem } from '@/entities/weather/ui/HourlyForecastItem';
import { GlassCard } from '@/shared/ui/GlassCard';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatKoreanTime } from '@/shared/util';

interface Props {
  lat: number;
  lon: number;
  name?: string;
}

export function WeatherDetailWidget({ lat, lon, name }: Props) {
  const router = useRouter();
  const { data: current } = useCurrentWeatherQuery(lat, lon);
  const { data: forecast } = useForecastQuery(lat, lon);

  if (!current || !forecast) {
    return <div className="flex h-screen items-center justify-center"></div>;
  }

  const hourlyData = forecast.list.slice(0, 8);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4">
      <header className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-full bg-white/40 p-2 transition hover:bg-white/60"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <div className="flex items-center gap-2 text-gray-800">
          <MapPin className="h-5 w-5" />
          <h1 className="text-2xl font-bold">{name || current.name}</h1>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <GlassCard className="flex flex-col items-center justify-center gap-2 py-10">
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
            alt={current.weather[0].description}
            className="h-32 w-32 drop-shadow-lg"
          />
          <div className="w-full items-center text-6xl font-bold text-gray-800">
            {Math.round(current.main.temp)}°
          </div>
          <p className="text-xl text-gray-600 capitalize">{current.weather[0].description}</p>
        </GlassCard>

        <GlassCard className="flex flex-col justify-center gap-6 p-8">
          <div className="flex items-center justify-between border-b border-gray-200/30 pb-4">
            <span className="text-gray-500">최고 기온</span>
            <span className="text-2xl font-bold text-red-500">
              {Math.round(current.main.temp_max)}°
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200/30 pb-4">
            <span className="text-gray-500">최저 기온</span>
            <span className="text-2xl font-bold text-blue-500">
              {Math.round(current.main.temp_min)}°
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">체감 온도</span>
            <span className="text-xl font-bold text-gray-700">
              {Math.round(current.main.feels_like)}°
            </span>
          </div>
        </GlassCard>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-gray-700">
          <Calendar className="h-5 w-5" />
          <h2 className="text-lg font-bold">시간대별 예보</h2>
        </div>

        <div className="scrollbar-hide flex w-full gap-3 overflow-x-auto pb-4">
          {hourlyData.map((item) => {
            const timeString = formatKoreanTime(item.dt * 1000);

            return (
              <HourlyForecastItem
                key={item.dt}
                time={timeString}
                temp={item.main.temp}
                iconCode={item.weather[0].icon}
                description={item.weather[0].description}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
