// TODO: content script
import React from 'react';
import ReactDOM from 'react-dom';
import { WeatherCard } from '../components/WatherCard';

const App: React.FC<{}> = () => {
  return <WeatherCard city="Amsterdam" inCelsius={true} />;
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
