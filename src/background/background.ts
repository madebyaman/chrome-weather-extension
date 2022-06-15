import {
  getStoredCities,
  getStoredOptions,
  setStoredOptions,
  storeCities,
} from '../utils/storage';
import { fetchOpenWeatherData } from '../utils/api';

chrome.runtime.onInstalled.addListener(() => {
  storeCities([]);
  setStoredOptions({ inCelsius: true, homeCity: '', hasAutoOverlay: false });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather',
    id: 'weatherExtension',
  });
});

chrome.contextMenus.onClicked.addListener((e) => {
  getStoredCities().then((cities) => {
    storeCities([...cities, e.selectionText]);
  });
});

getStoredOptions().then((options) => {
  if (!options.homeCity) return;
  fetchOpenWeatherData(options.homeCity, options.inCelsius).then((data) => {
    const temp = Math.round(data.main.temp);
    const symbol = options.inCelsius ? '\u2103' : '\u2109';
    chrome.action.setBadgeText({
      text: `${temp}${symbol}`,
    });
  });
});
