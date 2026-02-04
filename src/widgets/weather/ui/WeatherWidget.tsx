'use client';

import { RefreshCw, MapPin } from 'lucide-react';
import { useCurrentWeatherQuery } from '@/entities/weather/model/weather.query';
import { useCurrentLocation } from '@/features/detectLocation/hooks/useCurrentLocation';
import { GlassCard } from '@/shared/ui/GlassCard';
import { WeatherDetailGrid } from '@/entities/weather/ui/WeatherDetailGrid';
import { WeatherSkeleton } from '@/entities/weather/ui/WeatherSkeleton';
import { WeatherError } from '@/entities/weather/ui/WeatherError';
import { WeatherMainInfo } from '@/entities/weather/ui/WeatherInfo';

export default function WeatherWidget() {
  const { location, isLoading: isLocLoading, error: locError } = useCurrentLocation();
  const {
    data: weather,
    isLoading: isWeatherLoading,
    isError,
    refetch,
  } = useCurrentWeatherQuery(location?.lat ?? 0, location?.lon ?? 0, {
    enabled: !!location,
  });

  if (isLocLoading || (location && isWeatherLoading)) return <WeatherSkeleton />;
  if (locError || isError) return <WeatherError onRetry={() => window.location.reload()} />;
  if (!weather) return null;

  return (
    <GlassCard className="xs:max-w-[340px] max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[560px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="mb-1 flex items-center gap-1 text-gray-500">
            <MapPin className="h-3 w-3 animate-bounce md:h-4 md:w-4" />
            <span className="xs:text-xs text-[10px] font-medium tracking-wider uppercase md:text-sm">
              Current Location
            </span>
          </div>
          <div className="xs:text-2xl truncate p-[4px] leading-none font-bold tracking-tight text-gray-800 md:text-3xl lg:text-4xl">
            {weather.name}
          </div>
        </div>
        <button
          onClick={() => refetch()}
          className="rounded-full bg-white/40 p-2 text-gray-600 transition-all hover:rotate-180 hover:bg-white/80 md:p-3"
        >
          <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
      <WeatherMainInfo
        temp={weather.main.temp}
        description={weather.weather[0].description}
        iconCode={weather.weather[0].icon}
        isHot={weather.main.temp > 25}
      />
      <WeatherDetailGrid minTemp={weather.main.temp_min} maxTemp={weather.main.temp_max} />
    </GlassCard>
  );
}
