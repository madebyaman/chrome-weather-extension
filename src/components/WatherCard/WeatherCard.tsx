import React, { useEffect, useState } from 'react';
import {
  fetchOpenWeatherData,
  getWeatherIconsSrc,
  OpenWeatherData,
} from '../../utils/api';
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
  justify-content: space-around;
  gap: 0.5rem;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
`;

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'0.4rem'} my="1.6rem" style={{ fontSize: '62.5%' }}>
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
      <Grid>
        <ColumnFlex>
          <Flex>
            <Typography marginLeft={'10'} variant="h5">
              {city}
            </Typography>
            <Typography variant="body1">
              {getCountryFlagEmoji(weatherData.sys.country)}
            </Typography>
          </Flex>
          <Typography variant="subtitle1" style={{ fontSize: '3.6rem' }}>
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </ColumnFlex>
        {weatherData.weather.length && (
          <ColumnFlex>
            <img src={getWeatherIconsSrc(weatherData.weather[0].icon)} />
            <Typography variant="body1">
              {weatherData.weather[0].main}
            </Typography>
          </ColumnFlex>
        )}
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
