'use client';

import { ViewMode } from '../model/types';

interface Props {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}

export function ViewModeToggle({ mode, setMode }: Props) {
  return (
    <div className="flex w-64 rounded-full border border-white/40 bg-white/30 p-1 shadow-sm backdrop-blur-md">
      <button
        onClick={() => setMode(ViewMode.SEARCH)}
        className={`flex-1 rounded-full py-2 text-sm font-bold transition-all duration-300 ${
          mode === ViewMode.SEARCH
            ? 'bg-white text-blue-600 shadow-md'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        날씨 검색
      </button>
      <button
        onClick={() => setMode(ViewMode.BOOKMARK)}
        className={`flex-1 rounded-full py-2 text-sm font-bold transition-all duration-300 ${
          mode === ViewMode.BOOKMARK
            ? 'bg-white text-pink-500 shadow-md'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        즐겨찾기
      </button>
    </div>
  );
}
