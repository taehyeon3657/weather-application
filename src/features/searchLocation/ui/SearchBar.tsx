'use client';

import { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

import { getCoordsByAddress } from '../api/search.service';
import { useRegionSearch } from '../hooks/useRegionSearch';

interface Props {
  onSelectLocation: (loc: { lat: number; lon: number; name: string }) => void;
}

export function SearchBar({ onSelectLocation }: Props) {
  const { keyword, setKeyword, results } = useRegionSearch();
  const [isSearching, setIsSearching] = useState(false);

  const handleSelect = async (fullAddress: string) => {
    setIsSearching(true);
    try {
      const coords = await getCoordsByAddress(fullAddress);
      onSelectLocation(coords);
      setKeyword('');
    } catch (e) {
      alert('해당 장소의 위치 정보를 찾을 수 없습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  const formatAddress = (fullStr: string) => {
    const parts = fullStr.split('-');
    const main = parts.pop();
    const sub = parts.join(' ');
    return { main, sub };
  };

  return (
    <div className="relative z-50 w-full">
      <div className="relative flex h-14 w-full items-center rounded-3xl border border-white/40 bg-white/70 shadow-lg backdrop-blur-xl transition-all focus-within:ring-2 focus-within:ring-blue-400">
        <Search className="ml-5 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="지역명 검색 (예: 종로구, 제주도)"
          className="h-full w-full bg-transparent px-4 font-medium text-gray-800 outline-none placeholder:text-gray-500"
        />

        {keyword && (
          <button
            onClick={() => setKeyword('')}
            className="mr-2 rounded-full p-1 hover:bg-gray-200/50"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
        {isSearching && (
          <div className="mr-5 h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        )}
      </div>
      {results.length > 0 && (
        <ul className="scrollbar-hide absolute top-full right-0 left-0 mt-3 max-h-[300px] overflow-hidden overflow-y-auto rounded-2xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-2xl">
          {results.map((item) => {
            const { main, sub } = formatAddress(item);
            return (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className="group flex cursor-pointer items-center gap-3 border-b border-gray-100/50 px-6 py-4 transition-colors last:border-none hover:bg-blue-500/10"
              >
                <div className="rounded-full bg-white/50 p-2 transition-colors group-hover:bg-blue-500/20">
                  <MapPin className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-bold text-gray-800 group-hover:text-blue-600">
                    {main}
                  </span>
                  {sub && <span className="mt-0.5 text-xs text-gray-500">{sub}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
