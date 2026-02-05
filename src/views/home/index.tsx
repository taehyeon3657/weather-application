'use client';

import { useState } from 'react';

import WeatherWidget from '@/widgets/weather/ui/WeatherWidget';
import { WeatherError } from '@/entities/weather/ui/WeatherError';
import { useBookmarkStore } from '@/entities/bookmark/model/bookmark.store';
import { BookmarkCard } from '@/entities/bookmark/ui/BookmarkCard';
import { SearchBar } from '@/features/searchLocation/ui/SearchBar';
import { ViewModeToggle } from './ui/ViewModeToggle';

interface TargetLoc {
  lat: number;
  lon: number;
  name: string;
}

export function HomePage() {
  const [viewMode, setViewMode] = useState<'search' | 'bookmark'>('search');
  const [selectedLocation, setSelectedLocation] = useState<TargetLoc | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleSelectLocation = (loc: TargetLoc) => {
    setSelectedLocation(loc);
    setSearchError(null);
    setViewMode('search');
  };

  const handleSearchError = (msg: string) => {
    setSelectedLocation(null);
    setSearchError(msg);
  };

  const handleReset = () => {
    setSearchError(null);
    setSelectedLocation(null);
    setResetKey((prev) => prev + 1);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 px-4 py-20">
      <div className="fixed top-6 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-4 px-4">
        <div
          className={`w-full transition-all duration-300 ${
            viewMode === 'bookmark' ? 'pointer-events-none opacity-50' : 'opacity-100'
          }`}
        >
          <SearchBar
            key={resetKey}
            onSelectLocation={handleSelectLocation}
            onSearchError={handleSearchError}
            selectedLocation={selectedLocation}
          />
        </div>
        <ViewModeToggle mode={viewMode} setMode={setViewMode} />
      </div>

      <div className="mt-20 flex w-full max-w-4xl justify-center">
        {viewMode === 'search' && (
          <div className="animate-fade-in flex w-full flex-col items-center gap-8">
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
        )}
        {viewMode === 'bookmark' && (
          <div className="animate-fade-in w-full">
            {bookmarks.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p className="text-lg">즐겨찾기한 장소가 없습니다.</p>
                <p className="mt-2 text-sm">검색 후 하트 버튼을 눌러 추가해보세요!</p>
              </div>
            ) : (
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookmarks.map((fav) => (
                  <BookmarkCard key={`${fav.lat}-${fav.lon}`} location={fav} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
