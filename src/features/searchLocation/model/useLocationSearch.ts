'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getCoordsByAddress } from '../api/search.service';
import { useRegionSearch } from './useRegionSearch';
import { formatAddress } from '../lib/formatAddress';

interface Props {
  onSelectLocation: (loc: { lat: number; lon: number; name: string }) => void;
  onSearchError: (msg: string) => void;
  selectedLocation: { lat: number; lon: number; name: string } | null;
}

export function useLocationSearch({ onSelectLocation, onSearchError, selectedLocation }: Props) {
  const { keyword, setKeyword, results } = useRegionSearch();
  const [isSearching, setIsSearching] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const [isInteracting, setIsInteracting] = useState(false);
  const isSelectionRef = useRef(false);

  const executeSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      setIsSearching(true);
      try {
        const coords = await getCoordsByAddress(query);
        onSelectLocation(coords);
      } catch (e) {
        onSearchError(`'${query}'에 대한 위치 정보를 찾을 수 없습니다.`);
      } finally {
        setIsSearching(false);
      }
    },
    [onSelectLocation, onSearchError]
  );

  const handleSelect = (fullAddress: string) => {
    isSelectionRef.current = true;

    const { full } = formatAddress(fullAddress);
    setKeyword(full);

    setIsListOpen(false);
    setIsInteracting(false);

    executeSearch(fullAddress);
  };

  const handleChange = (val: string) => {
    setKeyword(val);
    setIsListOpen(true);
    isSelectionRef.current = false;
    setIsInteracting(false);
  };

  const handleClear = () => {
    setKeyword('');
    setIsListOpen(false);
  };

  useEffect(() => {
    if (!keyword.trim()) return;
    if (isSelectionRef.current) return;
    if (isInteracting) return;

    const timer = setTimeout(() => {
      executeSearch(keyword);
      setIsListOpen(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [keyword, executeSearch, isInteracting]);

  useEffect(() => {
    if (!selectedLocation) {
      setIsListOpen(false);
    }
  }, [selectedLocation, setKeyword]);

  return {
    keyword,
    results,
    isSearching,
    isListOpen,
    handlers: {
      handleChange,
      handleSelect,
      handleClear,
      setIsListOpen,
      setIsInteracting,
    },
  };
}
