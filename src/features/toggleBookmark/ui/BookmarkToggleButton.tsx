'use client';

import { Heart } from 'lucide-react';
import { useBookmarkToggle } from '..';

interface Props {
  lat: number;
  lon: number;
  name: string;
}

export function BookmarkToggleButton(props: Props) {
  const { isFav, handleToggle } = useBookmarkToggle(props);

  return (
    <button
      onClick={handleToggle}
      className={`group relative flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
        isFav
          ? 'bg-pink-100 text-pink-500 hover:bg-pink-200'
          : 'bg-white/40 text-gray-400 hover:bg-white/80 hover:text-pink-400'
      }`}
      aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      <Heart
        className={`h-6 w-6 transition-all duration-300 ${
          isFav ? 'scale-110 fill-current' : 'scale-100'
        }`}
      />
    </button>
  );
}
