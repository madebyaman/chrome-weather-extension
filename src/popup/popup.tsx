import React from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import { WeatherCard } from './WatherCard';
import '@fontsource/roboto';

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Delhi" />
      <WeatherCard city="Chandigarh" />
      <WeatherCard city="Sujanpur Tira" />
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
