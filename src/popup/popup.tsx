import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import { WeatherCard } from './WatherCard';
import { Grid, InputBase, Paper, IconButton, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getStoredCities, storeCities } from '../utils/storage';
import '@fontsource/roboto';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    getStoredCities().then(setCities);
  }, [setCities]);

  function handleCityButtonClick() {
    console.log(cityInput);
    if (!cityInput) return;
    const newCities = [...cities, cityInput];
    storeCities(newCities).then(() => {
      setCities(newCities);
      setCityInput('');
    });
  }

  function handleDelete(cityName: string) {
    const newCities = cities.filter((city) => city !== cityName);
    storeCities(newCities).then(() => {
      setCities(newCities);
    });
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city) => (
        <WeatherCard
          key={city}
          city={city}
          onDelete={() => handleDelete(city)}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
