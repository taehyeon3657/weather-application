'use client';

import { RefreshCw } from 'lucide-react';

import { GlassCard } from '@/shared/ui/GlassCard';
import { WeatherDetailGrid } from '@/entities/weather/ui/WeatherDetailGrid';
import { WeatherSkeleton } from '@/entities/weather/ui/WeatherSkeleton';
import { WeatherError } from '@/entities/weather/ui/WeatherError';
import { WeatherMainInfo } from '@/entities/weather/ui/WeatherInfo';
import { useCurrentWeatherQuery } from '@/entities/weather/model/weather.query';
import { useCurrentLocation } from '@/features/detectLocation/model/useCurrentLocation';
import { BookmarkToggleButton } from '@/features/toggleBookmark';

interface Props {
  targetLocation?: {
    lat: number;
    lon: number;
    name?: string;
  } | null;
}

export default function WeatherWidget({ targetLocation }: Props) {
  const { location: gpsLoc, isLoading: isLocLoading, error: locError } = useCurrentLocation();
  const activeLat = targetLocation?.lat ?? gpsLoc?.lat ?? 0;
  const activeLon = targetLocation?.lon ?? gpsLoc?.lon ?? 0;
  const isEnabled = !!targetLocation || !!gpsLoc;

  const {
    data: weather,
    isLoading: isWeatherLoading,
    isError,
    refetch,
  } = useCurrentWeatherQuery(activeLat, activeLon, {
    enabled: isEnabled,
  });

  const isRealLoading = targetLocation
    ? isWeatherLoading
    : isLocLoading || (gpsLoc && isWeatherLoading);

  if (isRealLoading) return <WeatherSkeleton />;
  if (!targetLocation && locError) return <WeatherError message={locError} />;
  if (isError) return <WeatherError />;
  if (!weather) return null;

  const displayName = targetLocation?.name || weather.name || weather.name;

  return (
    <GlassCard className="xs:max-w-[340px] max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[560px]">
      <div className="flex items-start justify-between gap-[32px]">
        <div className="flex flex-col">
          <div className="xs:text-2xl p-[4px] leading-tight font-bold tracking-tight break-words text-gray-800 md:text-3xl lg:text-4xl">
            {displayName}
          </div>
        </div>
        <button
          onClick={() => refetch()}
          className="rounded-full bg-white/40 p-2 text-gray-600 transition-all hover:rotate-180 hover:bg-white/80 md:p-3"
        >
          <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
      {weather && targetLocation && (
        <BookmarkToggleButton lat={activeLat} lon={activeLon} name={displayName} />
      )}
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
