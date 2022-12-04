import {
  getStoredCities,
  getStoredOptions,
  setStoredOptions,
  storeCities,
} from '../utils/storage';
import { fetchOpenWeatherData } from '../utils/api';
import { Messages } from '../utils/messages';

chrome.runtime.onInstalled.addListener(() => {
  storeCities([]);
  setStoredOptions({ inCelsius: true, homeCity: '', hasAutoOverlay: false });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather',
    id: 'weatherExtension',
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

chrome.contextMenus.onClicked.addListener((e) => {
  getStoredCities().then((cities) => {
    storeCities([...cities, e.selectionText]);
  });
});

function updateBadgetText() {
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
}

chrome.alarms.onAlarm.addListener(updateBadgetText);
chrome.runtime.onMessage.addListener((message) => {
  if (message === Messages.OPTIONS_SAVED) {
    updateBadgetText();
  }
});
