import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      console.error(error);
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValueInLS = (valueOrFn: any) => {
    let currentValue = valueOrFn;
    if (typeof valueOrFn === 'function') {
      currentValue = valueOrFn(value);
    }
    localStorage.setItem(key, JSON.stringify(currentValue));
    setValue(currentValue);
  };

  return [value, setValueInLS];
};

export default useLocalStorage;
