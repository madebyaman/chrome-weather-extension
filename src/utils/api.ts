const OPEN_WEATHER_API_KEY = 'ee9fe220183d6713fea0827a5044d91e';

export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  timezone: number;
}

export async function fetchOpenWeatherData(
  city: string,
  inCelsius: boolean
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
      inCelsius ? 'metric' : 'imperial'
    }&appid=${OPEN_WEATHER_API_KEY}`
  );
  if (!res.ok) {
    throw new Error('City not found');
  }
  const data: OpenWeatherData = await res.json();
  return data;
}

export function getWeatherIconsSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
