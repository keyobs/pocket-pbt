import { useCallback, useState } from "react";

/**
 * @param key localStorage key
 * @param dataToStore
 */

export function useLocalStorage<T>(key: string, dataToStore: T) {
  const readData = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : dataToStore;
    } catch (error) {
      console.warn(`Error reading localStorage "${key}":`, error);
      return dataToStore;
    }
  }, [key, dataToStore]);

  const [storedData, setStoredData] = useState(readData);

  const updateStoredData = useCallback(
    (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        setStoredData(newValue);
      } catch (error) {
        console.error(`Error setting localStorage "${key}":`, error);
      }
    },
    [key]
  );

  const removeStoredData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredData(dataToStore);
    } catch (error) {
      console.error(`Error removing localStorage "${key}":`, error);
    }
  }, [key, dataToStore]);

  return { storedData, updateStoredData, removeStoredData };
}
