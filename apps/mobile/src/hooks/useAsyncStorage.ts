import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @param key AsyncStorage key
 * @param dataToStore default value, used until the persisted read resolves
 */
export function useAsyncStorage<T>(key: string, dataToStore: T) {
  const [storedData, setStoredData] = useState<T>(dataToStore);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    AsyncStorage.getItem(key)
      .then((item) => {
        if (cancelled || !item) return;
        try {
          setStoredData(JSON.parse(item) as T);
        } catch (error) {
          console.warn(`Error reading AsyncStorage "${key}":`, error);
        }
      })
      .catch((error) => {
        console.warn(`Error reading AsyncStorage "${key}":`, error);
      })
      .finally(() => {
        if (!cancelled) setHasHydrated(true);
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const updateStoredData = useCallback(
    (newValue: T) => {
      setStoredData(newValue);
      AsyncStorage.setItem(key, JSON.stringify(newValue)).catch((error) => {
        console.error(`Error setting AsyncStorage "${key}":`, error);
      });
    },
    [key]
  );

  const removeStoredData = useCallback(() => {
    setStoredData(dataToStore);
    AsyncStorage.removeItem(key).catch((error) => {
      console.error(`Error removing AsyncStorage "${key}":`, error);
    });
  }, [key, dataToStore]);

  return { storedData, updateStoredData, removeStoredData, hasHydrated };
}
