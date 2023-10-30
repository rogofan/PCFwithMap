export type IWeatherData = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  dt: number;
  sys: {
    pod: string;
  };
  rain: {
    "3h": number;
  };
  dt_txt: string;
};

export type IWeatherDataHeader = {
  coords: {
    lat: number;
    lon: number;
  };
  country: string;
  id: Number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
};

export type WeatherAPIResponse = {
  list: IWeatherData[];
};

export interface DayProps {
  data: IWeatherData;
}

export enum WeatherType {
  THUNDER = 200,
  DRIZZLE = 300,
  RAIN = 500,
  SNOW = 600,
  FOG = 700,
  SUNNY = 800,
  CLOUDY = 801,
}

export const weatherConfig = [
  { type: WeatherType.THUNDER, range: [200, 299] },
  { type: WeatherType.DRIZZLE, range: [300, 399] },
  { type: WeatherType.RAIN, range: [500, 599] },
  { type: WeatherType.SNOW, range: [600, 699] },
  { type: WeatherType.FOG, range: [700, 799] },
  { type: WeatherType.SUNNY, codes: [800] },
  { type: WeatherType.CLOUDY, range: [801, 804] },
];
