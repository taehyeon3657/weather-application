type CurrentWeather = {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  name: string;
  dt: number;
};

type WeatherForecast = {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
    }[];
    dt_txt: string;
  }[];
};

export type { CurrentWeather, WeatherForecast };
