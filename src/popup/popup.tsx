import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import { fetchOpenWeatherData } from '../utils/api';

const App: React.FC<{}> = () => {
  useEffect(() => {
    fetchOpenWeatherData('Toronto').then(console.log).catch(console.error);
  }, []);

  return (
    <div>
      <img src="icon.png" />
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
