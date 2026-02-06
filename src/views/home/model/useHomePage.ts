// src/views/home/model/useHomePage.ts
import { useState } from 'react';
import { useBookmarkStore } from '@/entities/bookmark';
import { TargetLoc, ViewMode } from './types';
import { DEFAULT_VIEW_MODE } from '../config';

export function useHomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);
  const [selectedLocation, setSelectedLocation] = useState<TargetLoc | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [resetKey, setResetKey] = useState(0);

  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleSelectLocation = (loc: TargetLoc) => {
    setSelectedLocation(loc);
    setSearchError(null);
    setViewMode(ViewMode.SEARCH);
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

  return {
    viewMode,
    selectedLocation,
    searchError,
    resetKey,
    bookmarks,

    handlers: {
      setViewMode,
      handleSelectLocation,
      handleSearchError,
      handleReset,
    },
  };
}
