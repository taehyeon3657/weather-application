import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookmarkLocation {
  lat: number;
  lon: number;
  name: string;
  alias?: string;
}

interface BookmarksState {
  bookmarks: BookmarkLocation[];
  addBookmark: (loc: BookmarkLocation) => void;
  removeBookmark: (lat: number, lon: number) => void;
  isBookmark: (lat: number, lon: number) => boolean;
  updateAlias: (lat: number, lon: number, alias: string) => void;
}

export const useBookmarkStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (location) =>
        set((state) => {
          if (get().isBookmark(location.lat, location.lon)) return state;
          return { bookmarks: [...state.bookmarks, location] };
        }),

      removeBookmark: (lat, lon) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((item) => item.lat !== lat || item.lon !== lon),
        })),

      isBookmark: (lat, lon) => {
        return get().bookmarks.some((item) => item.lat === lat && item.lon === lon);
      },

      updateAlias: (lat, lon, alias) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((item) =>
            item.lat === lat && item.lon === lon ? { ...item, alias } : item
          ),
        })),
    }),
    {
      name: 'weather-bookmarks-storage',
    }
  )
);
