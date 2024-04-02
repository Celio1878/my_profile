// create useLocalStorage hook
import { useState } from "react";

interface IUseLocalStorageReturn {
  stored_value: string | null;
  set_value: (value: string) => void;
}

export const useLocalStorage = (
  key: string,
  initialValue: string,
): IUseLocalStorageReturn => {
  const [stored_value, set_stored_value] = useState(() => {
    try {
      return typeof window !== "undefined"
        ? localStorage.getItem(key)
        : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const set_value = (value: string) => {
    try {
      set_stored_value(value);
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    stored_value,
    set_value,
  };
};
