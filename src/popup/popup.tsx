import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import { WeatherCard } from '../components/WatherCard';
import {
  Grid,
  InputBase,
  Paper,
  IconButton,
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
  storeCities,
} from '../utils/storage';
import '@fontsource/roboto';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions>({
    inCelsius: true,
    homeCity: '',
    hasAutoOverlay: false,
  });

  useEffect(() => {
    getStoredCities().then(setCities);
    getStoredOptions().then(setOptions);
  }, []);

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

  function handleCelsiusSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setStoredOptions({ ...options, inCelsius: checked }).then(() => {
      setOptions({ ...options, inCelsius: checked });
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
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={options.inCelsius}
                      onChange={handleCelsiusSwitchChange}
                    />
                  }
                  label="Celsius"
                />
              </FormGroup>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity !== '' && (
        <WeatherCard city={options.homeCity} inCelsius={options.inCelsius} />
      )}
      {cities.map((city) => (
        <WeatherCard
          key={city}
          city={city}
          onDelete={() => handleDelete(city)}
          inCelsius={options.inCelsius}
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
