import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import { WeatherCard } from './WatherCard';
import { Grid, InputBase, Paper, IconButton, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import '@fontsource/roboto';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([
    'Toronto',
    'New Delhi',
    'Error',
  ]);
  const [cityInput, setCityInput] = useState<string>('');

  function handleCityButtonClick() {
    if (!cityInput) return;
    setCities([...cities, cityInput]);
    setCityInput('');
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
        <WeatherCard city={city} key={city} />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
