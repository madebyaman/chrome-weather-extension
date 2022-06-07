import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import './options.css';
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from '../utils/storage';

type FormState = 'READY' | 'SAVING';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>({
    inCelsius: true,
    homeCity: '',
  });
  const [formState, setFormState] = useState<FormState>('READY');

  useEffect(() => {
    getStoredOptions().then(setOptions);
  }, []);

  function handleHomeCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOptions({ ...options, homeCity: e.target.value });
  }

  function handleOptionsSubmit(e: React.FormEvent<HTMLFormElement>) {
    setFormState('SAVING');
    e.preventDefault();
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('READY');
      }, 1000);
    });
    // show success message
  }

  if (!options) {
    return null;
  }

  return (
    <div>
      <div>
        <h1>Weather Extension Options</h1>
      </div>
      <div>
        <form onSubmit={handleOptionsSubmit}>
          <label>
            Home city name
            <input
              type="text"
              name="home-city"
              disabled={formState === 'SAVING'}
              value={options.homeCity}
              onChange={handleHomeCityChange}
              placeholder="Enter your home city"
            />
          </label>
          <button disabled={formState === 'SAVING'}>
            {formState === 'READY' ? 'Save' : 'Saving'}
          </button>
        </form>
      </div>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
