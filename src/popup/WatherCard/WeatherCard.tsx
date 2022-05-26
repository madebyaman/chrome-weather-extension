import React, { useEffect } from 'react';
import { fetchOpenWeatherData } from '../../utils/api';
import './WeatherCard.css';

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  useEffect(() => {
    fetchOpenWeatherData(city).then(console.log).catch(console.error);
  }, [city]);

  return <div>{city}</div>;
};

export default WeatherCard;
