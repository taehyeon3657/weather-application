'use client';

import { Heart } from 'lucide-react';
import { useBookmarkStore } from '@/entities/bookmark/model/bookmark.store';

interface Props {
  lat: number;
  lon: number;
  name: string;
}

export function BookmarkToggleButton({ lat, lon, name }: Props) {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const isFav = bookmarks.some((item) => item.lat === lat && item.lon === lon);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFav) {
      removeBookmark(lat, lon);
    } else {
      addBookmark({ lat, lon, name });
    }
  };

  return (
    <button
      onClick={toggle}
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
