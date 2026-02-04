import { ArrowDown, ArrowUp } from 'lucide-react';

interface Props {
  minTemp: number;
  maxTemp: number;
}

export function WeatherDetailGrid({ minTemp, maxTemp }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-6">
      <DetailItem label="Min Temp" value={minTemp} color="text-blue-600" Icon={ArrowDown} />
      <DetailItem label="Max Temp" value={maxTemp} color="text-red-500" Icon={ArrowUp} />
    </div>
  );
}

function DetailItem({ label, value, color, Icon }: any) {
  return (
    <div className="xs:p-4 flex items-center justify-between rounded-2xl border border-white/40 bg-white/40 p-3 shadow-sm md:p-5">
      <div className="flex flex-col">
        <span className="xs:text-xs mb-1 text-[10px] font-medium text-gray-500 md:text-sm">
          {label}
        </span>
        <span className={`font-bold ${color} xs:text-xl text-lg md:text-2xl`}>
          {Math.round(value)}°
        </span>
      </div>
      <Icon className={`opacity-50 ${color} xs:w-5 xs:h-5 h-4 w-4 md:w-6`} />
    </div>
  );
}
