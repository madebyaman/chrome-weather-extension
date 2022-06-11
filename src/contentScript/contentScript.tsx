// TODO: content script
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WeatherCard } from '../components/WatherCard';
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from '../utils/storage';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    getStoredOptions().then(setOptions);
  }, []);

  function handleDeleteButtonClick() {
    setStoredOptions({ ...options, hasAutoOverlay: false }).then(() => {
      setIsActive(false);
    });
  }

  if (!options || !isActive || !options.hasAutoOverlay) return null;
  return (
    <WeatherCard
      city={options.homeCity}
      inCelsius={options.inCelsius}
      onDelete={handleDeleteButtonClick}
    />
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
