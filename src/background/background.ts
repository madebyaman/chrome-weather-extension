import { storeCities } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  storeCities([]);
});
