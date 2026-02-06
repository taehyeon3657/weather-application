import { useBookmarkStore, MAX_BOOKMARKS } from '@/entities/bookmark';

interface Params {
  lat: number;
  lon: number;
  name: string;
}

export function useBookmarkToggle({ lat, lon, name }: Params) {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const isFav = bookmarks.some((item) => item.lat === lat && item.lon === lon);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFav) {
      removeBookmark(lat, lon);
    } else {
      if (bookmarks.length >= MAX_BOOKMARKS) {
        alert(`즐겨찾기는 최대 ${MAX_BOOKMARKS}개까지만 저장할 수 있어요.`);
        return;
      }
      addBookmark({ lat, lon, name });
    }
  };

  return { isFav, handleToggle };
}
