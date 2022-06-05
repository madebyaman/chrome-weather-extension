export interface LocalStorage {
  cities?: string[];
}

export type LocalStorageKeys = keyof LocalStorage;

export function storeCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = { cities };
  return new Promise((res) => {
    chrome.storage.local.set(vals, () => res());
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = [];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities);
    });
  });
}
