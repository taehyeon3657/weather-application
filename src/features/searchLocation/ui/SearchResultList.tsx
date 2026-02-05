import { MapPin } from 'lucide-react';
import { formatAddress } from '../lib/formatAddress';

interface Props {
  results: string[];
  onSelect: (item: string) => void;
  onInteractionStateChange: (isInteracting: boolean) => void;
}

export function SearchResultList({ results, onSelect, onInteractionStateChange }: Props) {
  if (results.length === 0) return null;

  return (
    <ul
      onMouseEnter={() => onInteractionStateChange(true)}
      onMouseLeave={() => onInteractionStateChange(false)}
      onTouchStart={() => onInteractionStateChange(true)}
      className="scrollbar-hide absolute top-full right-0 left-0 mt-3 max-h-[300px] overflow-hidden overflow-y-auto rounded-2xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-2xl"
    >
      {results.map((item) => {
        const { main, sub } = formatAddress(item);
        return (
          <li
            key={item}
            onClick={() => onSelect(item)}
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
  );
}
