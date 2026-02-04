interface Props {
  temp: number;
  description: string;
  iconCode: string;
  isHot: boolean;
}

export function WeatherMainInfo({ temp, description, iconCode, isHot }: Props) {
  const tempColor = isHot ? 'text-orange-500' : 'text-blue-600';

  return (
    <div className="mt-6 mb-8 flex flex-col items-center md:mt-10 md:mb-12">
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt={description}
        className="animate-float xs:w-40 xs:h-40 h-32 w-32 drop-shadow-2xl md:h-52 md:w-52 lg:h-64 lg:w-64"
      />
      <div className="-mt-4 flex flex-col items-center md:-mt-6">
        <span
          className={`font-black tracking-tighter ${tempColor} xs:text-7xl text-6xl leading-none drop-shadow-sm sm:text-8xl md:text-9xl lg:text-[10rem]`}
        >
          {Math.round(temp)}°
        </span>
        <span className="xs:text-sm mt-2 rounded-full border border-white/60 bg-white/50 px-3 py-1 text-xs font-semibold text-gray-700 capitalize shadow-sm backdrop-blur-sm md:px-5 md:py-2 md:text-base">
          {description}
        </span>
      </div>
    </div>
  );
}
