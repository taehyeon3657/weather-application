'use client';

import { GlassCard } from '@/shared/ui/GlassCard';
import { Trash2 } from 'lucide-react';
import { BookmarkLocation, useBookmarkCard } from '..';

interface Props {
  location: BookmarkLocation;
}

export function BookmarkCard({ location }: Props) {
  const { isEditing, aliasInput, weather, handlers } = useBookmarkCard(location);

  return (
    <GlassCard
      onClick={handlers.handleCardClick}
      className="relative p-5 transition-transform hover:-translate-y-1"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex h-8 items-center gap-2">
          {isEditing ? (
            <input
              value={aliasInput}
              onChange={handlers.handleChangeInput}
              onBlur={handlers.handleSave}
              onKeyDown={handlers.handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="w-32 rounded bg-white/50 px-2 py-1 text-lg font-bold text-gray-400 ring-2 ring-blue-300 transition-all outline-none"
              autoFocus
            />
          ) : (
            <h3
              onClick={(e) => {
                e.stopPropagation();
                handlers.handleStartEdit();
              }}
              className="max-w-[140px] cursor-pointer truncate text-lg font-bold text-gray-800 decoration-gray-400 decoration-dotted underline-offset-4 hover:text-blue-600 hover:underline"
            >
              {location.alias || location.name}
            </h3>
          )}
        </div>
        <button
          onClick={handlers.handleDelete}
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
