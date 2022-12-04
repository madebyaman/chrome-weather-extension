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
  Card,
} from '@mui/material';
import { Add as AddIcon, PictureInPicture } from '@mui/icons-material';
import {
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
  storeCities,
} from '../utils/storage';
import '@fontsource/roboto';
import { Messages } from '../utils/messages';
import styled from '@emotion/styled';

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

  function handleOverlayButtonClick() {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  }

  return (
    <Box mx="8px" my="16px">
      <Card>
        <Box px="15px" py="5px">
          <FlexBox>
            <InputBase
              placeholder="Add a city name"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <IconButton onClick={handleCityButtonClick}>
              <AddIcon />
            </IconButton>
          </FlexBox>
          <FlexBox>
            <FormControlLabel
              control={
                <Switch
                  checked={options.inCelsius}
                  onChange={handleCelsiusSwitchChange}
                />
              }
              label="Celsius"
            />
            <IconButton onClick={handleOverlayButtonClick}>
              <PictureInPicture />
            </IconButton>
          </FlexBox>
        </Box>
      </Card>
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
