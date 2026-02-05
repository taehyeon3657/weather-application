import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onFocus: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export function SearchInput({ value, onChange, onFocus, onClear, isLoading }: Props) {
  return (
    <div className="relative flex h-14 w-full items-center rounded-3xl border border-white/40 bg-white/70 shadow-lg backdrop-blur-xl transition-all focus-within:ring-2 focus-within:ring-blue-400">
      <Search className="ml-5 h-5 w-5 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder="지역명 검색 (예: 종로구, 제주도)"
        className="h-full w-full bg-transparent px-4 font-medium text-gray-800 outline-none placeholder:text-gray-500"
      />

      {value && (
        <button onClick={onClear} className="mr-2 rounded-full p-1 hover:bg-gray-200/50">
          <X className="h-4 w-4 text-gray-500" />
        </button>
      )}

      {isLoading && (
        <div className="mr-5 h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      )}
    </div>
  );
}
