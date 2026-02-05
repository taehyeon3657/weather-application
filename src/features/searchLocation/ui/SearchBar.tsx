'use client';

import { useLocationSearch } from '../model/useLocationSearch';
import { SearchInput } from './SearchInput';
import { SearchResultList } from './SearchResultList';

interface Props {
  onSelectLocation: (loc: { lat: number; lon: number; name: string }) => void;
  onSearchError: (msg: string) => void;
  selectedLocation: { lat: number; lon: number; name: string } | null;
}

export function SearchBar(props: Props) {
  const { keyword, results, isSearching, isListOpen, handlers } = useLocationSearch(props);

  return (
    <div className="relative z-50 w-full">
      <SearchInput
        value={keyword}
        onChange={handlers.handleChange}
        onFocus={() => handlers.setIsListOpen(true)}
        onClear={handlers.handleClear}
        isLoading={isSearching}
      />
      {isListOpen && (
        <SearchResultList
          results={results}
          onSelect={handlers.handleSelect}
          onInteractionStateChange={handlers.setIsInteracting}
        />
      )}
    </div>
  );
}
