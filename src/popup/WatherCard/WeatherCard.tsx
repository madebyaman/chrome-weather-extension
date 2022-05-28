import React, { useEffect, useState } from 'react';
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api';
import './WeatherCard.css';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Typography,
} from '@mui/material';

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);

  useEffect(() => {
    {
      city;
    }
    fetchOpenWeatherData(city).then(setWeatherData).catch(console.error);
  }, [city]);

  if (!weatherData) {
    return <div>Loading</div>;
  }

  return (
    <Box mx={'4px'} my="16px">
      <Card>
        <CardContent>
          <Typography variant="h5">{city}</Typography>
          <Typography variant="body1">
            Temperature: {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherCard;
