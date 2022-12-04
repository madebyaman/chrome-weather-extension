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
import styled from '@emotion/styled';

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

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
    let unmounted = false;
    fetchOpenWeatherData(city, inCelsius)
      .then((data) => {
        if (unmounted) return;
        setWeatherData(data);
        setCardState('READY');
      })
      .catch((err) => {
        if (unmounted) return;
        setCardState('ERROR');
        console.error(err);
      });

    return () => {
      unmounted = true;
    };
  }, [city, inCelsius]);

  function getCountryFlagEmoji(countryCode: string) {
    const codepoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codepoints);
  }

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
      <div>
        <Flex>
          <Typography marginLeft={'10'} variant="h5">
            {city}
          </Typography>
          <Typography variant="body1">
            {getCountryFlagEmoji(weatherData.sys.country)}
          </Typography>
        </Flex>
        {weatherData.weather.length && (
          <Flex>
            <Typography variant="body1">
              {weatherData.weather[0].main}
            </Typography>
            <img src={getWeatherIconsSrc(weatherData.weather[0].icon)} />
          </Flex>
        )}
        <Typography variant="body1">
          Temperature: {Math.round(weatherData.main.temp)}
        </Typography>
        <Typography variant="body1">
          Feels like: {Math.round(weatherData.main.feels_like)}
        </Typography>
      </div>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
