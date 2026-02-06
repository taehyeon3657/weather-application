export enum ViewMode {
  SEARCH = 'search',
  BOOKMARK = 'bookmark',
}

type TargetLoc = {
  lat: number;
  lon: number;
  name: string;
};

export type { TargetLoc };
