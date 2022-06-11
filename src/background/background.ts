import { setStoredOptions, storeCities } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  storeCities([]);
  setStoredOptions({ inCelsius: true, homeCity: '', hasAutoOverlay: false });
});
