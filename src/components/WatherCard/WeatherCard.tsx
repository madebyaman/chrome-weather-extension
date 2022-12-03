import React, { useEffect, useState } from 'react';
import {
  fetchOpenWeatherData,
  getWeatherIconsSrc,
  OpenWeatherData,
} from '../../utils/api';
import './WeatherCard.css';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Typography,
} from '@mui/material';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my="16px">
      <Card>
        <CardContent>{children}</CardContent>
        {onDelete && (
          <CardActions>
            <Button color="secondary" onClick={onDelete} size="small">
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

type WeatherCardState = 'LOADING' | 'ERROR' | 'READY';

const WeatherCard: React.FC<{
  city: string;
  onDelete?: () => void;
  inCelsius: boolean;
}> = ({ city, onDelete, inCelsius }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('LOADING');

  useEffect(() => {
    {
      city;
    }
    fetchOpenWeatherData(city, inCelsius)
      .then((data) => {
        setWeatherData(data);
        setCardState('READY');
      })
      .catch((err) => {
        setCardState('ERROR');
        console.error(err);
      });
  }, [city, inCelsius]);

  if (cardState === 'LOADING' || cardState === 'ERROR') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState === 'LOADING'
            ? 'Loading...'
            : 'Error: Could not retrieve weather for this city'}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{city}</Typography>
      <Typography variant="body1">
        Temperature: {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
      {weatherData.weather.length && (
        <>
          <img src={getWeatherIconsSrc(weatherData.weather[0].icon)} />
          <p>{weatherData.weather[0].main}</p>
        </>
      )}
    </WeatherCardContainer>
  );
};

export default WeatherCard;
