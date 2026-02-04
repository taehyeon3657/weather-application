'use client';

import { useState } from 'react';
import { SearchBar } from '@/features/searchLocation/ui/SearchBar';
import WeatherWidget from '@/widgets/weather/ui/WeatherWidget';

interface TargetLoc {
  lat: number;
  lon: number;
  name: string;
}

export function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<TargetLoc | null>(null);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 px-4">
      <div className="fixed top-3 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
        <SearchBar onSelectLocation={setSelectedLocation} />
      </div>

      <div className="flex w-full flex-col items-center gap-8">
        <WeatherWidget targetLocation={selectedLocation} />

        {selectedLocation && (
          <button
            onTouchEnd={() => setSelectedLocation(null)}
            className="animate-fade-in rounded-full bg-white/50 px-6 py-2 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:bg-white/80 active:scale-95"
          >
            📍 내 위치로 돌아가기
          </button>
        )}
      </div>
    </main>
  );
}
