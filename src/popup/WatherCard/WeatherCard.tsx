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
            <Button onClick={onDelete} size="small">
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

type WeatherCardState = 'LOADING' | 'ERROR' | 'READY';

const WeatherCard: React.FC<{ city: string; onDelete?: () => void }> = ({
  city,
  onDelete,
}) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('LOADING');

  useEffect(() => {
    {
      city;
    }
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data);
        setCardState('READY');
      })
      .catch((err) => {
        setCardState('ERROR');
        console.error(err);
      });
  }, [city]);

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
    <WeatherCardContainer>
      <Typography variant="h5">{city}</Typography>
      <Typography variant="body1">
        Temperature: {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
