import {
  getStoredCities,
  setStoredOptions,
  storeCities,
} from '../utils/storage';

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
