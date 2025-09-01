import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, defaultValue: T, debounceMs: number = 500): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to load persisted state for key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.warn(`Failed to persist state for key "${key}":`, error);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [key, state, debounceMs]);

  return [state, setState];
}