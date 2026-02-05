'use client';

import { useState } from 'react';
import { SearchBar } from '@/features/searchLocation/ui/SearchBar';
import WeatherWidget from '@/widgets/weather/ui/WeatherWidget';
import { WeatherError } from '@/entities/weather/ui/WeatherError';

interface TargetLoc {
  lat: number;
  lon: number;
  name: string;
}

export function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<TargetLoc | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSelectLocation = (loc: TargetLoc) => {
    setSelectedLocation(loc);
    setSearchError(null);
  };

  const handleSearchError = (msg: string) => {
    setSelectedLocation(null);
    setSearchError(msg);
  };

  const handleReset = () => {
    setSearchError(null);
    setSelectedLocation(null);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 px-4">
      <div className="fixed top-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
        <SearchBar
          onSelectLocation={handleSelectLocation}
          onSearchError={handleSearchError}
          selectedLocation={selectedLocation}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-8">
        {searchError ? (
          <WeatherError message={searchError} />
        ) : (
          <WeatherWidget targetLocation={selectedLocation} />
        )}

        {!searchError && selectedLocation && (
          <button
            onClick={handleReset}
            className="animate-fade-in rounded-full bg-white/50 px-6 py-2 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:bg-white/80 active:scale-95"
          >
            📍 내 위치로 돌아가기
          </button>
        )}
      </div>
    </main>
  );
}
