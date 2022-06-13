// TODO: content script
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WeatherCard } from '../components/WatherCard';
import { Messages } from '../utils/messages';
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from '../utils/storage';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  useEffect(() => {
    const getMessage = (msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    };
    chrome.runtime.onMessage.addListener(getMessage);
    return () => chrome.runtime.onMessage.removeListener(getMessage);
  }, [isActive]);

  function handleDeleteButtonClick() {
    setStoredOptions({ ...options, hasAutoOverlay: false }).then(() => {
      setIsActive(false);
    });
  }

  if (!options) return null;
  return (
    <>
      {isActive && (
        <WeatherCard
          city={options.homeCity}
          inCelsius={options.inCelsius}
          onDelete={handleDeleteButtonClick}
        />
      )}
    </>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
