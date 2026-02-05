'use client';

import { useCurrentWeatherQuery } from '@/entities/weather/model/weather.query';

import { GlassCard } from '@/shared/ui/GlassCard';
import { Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { BookmarkLocation, useBookmarkStore } from '../model/bookmark.store';

interface Props {
  location: BookmarkLocation;
}

export function BookmarkCard({ location }: Props) {
  const { removeBookmark, updateAlias } = useBookmarkStore();
  const [isEditing, setIsEditing] = useState(false);
  const [aliasInput, setAliasInput] = useState(location.alias || location.name);

  const { data: weather } = useCurrentWeatherQuery(location.lat, location.lon);

  const handleRename = () => {
    if (isEditing) {
      updateAlias(location.lat, location.lon, aliasInput);
    }
    setIsEditing(!isEditing);
  };

  return (
    <GlassCard className="relative p-5 transition-transform hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              className="w-32 rounded bg-white/50 px-2 py-1 text-sm font-bold"
              autoFocus
            />
          ) : (
            <h3 className="max-w-[140px] truncate text-lg font-bold text-gray-800">
              {location.alias || location.name}
            </h3>
          )}
          <button onClick={handleRename} className="text-gray-400 hover:text-blue-500">
            <Edit2 className="h-3 w-3" />
          </button>
        </div>

        <button
          onClick={() => removeBookmark(location.lat, location.lon)}
          className="text-gray-400 transition-colors hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {weather ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-800">
              {Math.round(weather.main.temp)}°
            </span>
            <span className="text-xs text-gray-500">{weather.weather[0].description}</span>
          </div>

          <div className="flex flex-col items-end text-sm text-gray-600">
            <div className="flex gap-1">
              <span className="text-blue-500">최저 {Math.round(weather.main.temp_min)}°</span>
            </div>
            <div className="flex gap-1">
              <span className="text-red-500">최고 {Math.round(weather.main.temp_max)}°</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-16 animate-spin items-center justify-center text-xs text-gray-400"></div>
      )}
    </GlassCard>
  );
}
