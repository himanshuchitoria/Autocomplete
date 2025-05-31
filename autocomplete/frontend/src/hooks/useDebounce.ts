// src/hooks/useDebounce.ts

import { useState, useEffect } from 'react';

/**
 * useDebounce
 * A custom React hook that debounces a value by a specified delay.
 * Useful for delaying API calls until the user stops typing.
 *
 * @param value - The value to debounce (string, number, etc.)
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 *
 * Features:
 * - Debounces any value (commonly used for search input)
 * - Cleans up timers on unmount or value/delay change
 * - Modular and reusable
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
