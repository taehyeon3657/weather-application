type BookmarkLocation = {
  lat: number;
  lon: number;
  name: string;
  alias?: string;
};

type Bookmarks = {
  bookmarks: BookmarkLocation[];
  addBookmark: (loc: BookmarkLocation) => void;
  removeBookmark: (lat: number, lon: number) => void;
  isBookmark: (lat: number, lon: number) => boolean;
  updateAlias: (lat: number, lon: number, alias: string) => void;
};

export type { BookmarkLocation, Bookmarks };
