const OPEN_WEATHER_API_KEY = 'ee9fe220183d6713fea0827a5044d91e';

export async function fetchOpenWeatherData(city: string): Promise<any> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`
  );
  if (!res.ok) {
    throw new Error('City not found');
  }
  const data = await res.json();
  return data;
}
