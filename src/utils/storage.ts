export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  inCelsius: boolean;
  homeCity: string;
}

export type LocalStorageKeys = keyof LocalStorage;

export function storeCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = { cities };
  return new Promise((res) => {
    chrome.storage.local.set(vals, () => res());
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities || []);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = { options };
  return new Promise((res) => {
    chrome.storage.local.set(vals, () => res());
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options);
    });
  });
}
