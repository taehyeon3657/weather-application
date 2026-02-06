interface Props {
  time: string;
  temp: number;
  iconCode: string;
  description: string;
}

export function HourlyForecastItem({ time, temp, iconCode, description }: Props) {
  return (
    <div className="flex min-w-[80px] flex-col items-center gap-2 rounded-xl bg-white/20 p-3 backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-600">{time}</span>

      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt={description}
        className="h-8 w-8"
      />

      <span className="text-lg font-bold text-gray-800">{Math.round(temp)}°</span>
    </div>
  );
}
