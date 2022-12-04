import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from '../utils/storage';
import styled from '@emotion/styled';
import { Messages } from '../utils/messages';

type FormState = 'READY' | 'SAVING';

const Form = styled.form`
  input,
  label,
  button {
    font-size: 1.7rem;
    color: #2d3748;
  }

  label,
  input,
  button {
    display: block;
  }

  input[type='text'] {
    margin-top: 0.8rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    appearance: none;
    border-width: 1px;
    border-radius: 0.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  label {
    margin-bottom: 1.5rem;
  }

  button {
    background-color: #f6e05e;
    cursor: pointer;
    font-weight: bold;
    border: 0;
    padding: 8px 15px;
    border-radius: 5px;
  }

  button:hover {
    background-color: #ecc94b;
  }

  button:focus {
    outline: none;
  }
`;

const Heading1 = styled.h1`
  font-size: 3.8rem;
  color: #2d3748;
`;

const PageContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.07);
  padding: 30px 30px 60px;
  margin-top: 50px;
  border-radius: 5px;
`;

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>({
    inCelsius: true,
    homeCity: '',
    hasAutoOverlay: false,
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
      // Why timeout to add artificial feedback for saving
      setTimeout(() => {
        setFormState('READY');
      }, 1000);
      chrome.runtime.sendMessage(Messages.OPTIONS_SAVED);
    });
  }

  if (!options) {
    return null;
  }

  return (
    <PageContainer>
      <div>
        <Heading1>Weather Extension Options</Heading1>
      </div>
      <div>
        <Form onSubmit={handleOptionsSubmit}>
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
          <label>
            Auto Overlay
            <input
              type="checkbox"
              checked={options.hasAutoOverlay}
              onChange={(e) =>
                setOptions({ ...options, hasAutoOverlay: e.target.checked })
              }
            />
          </label>
          <button disabled={formState === 'SAVING'}>
            {formState === 'READY' ? 'Save' : 'Saving'}
          </button>
        </Form>
      </div>
    </PageContainer>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
