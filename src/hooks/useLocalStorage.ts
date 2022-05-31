import React, {useCallback, useState} from "react";
import {localStorageWrapper} from "../api/storageAPI";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorageWrapper.getItem<T>(key);
    if (typeof savedValue !== "undefined") {
      return savedValue;
    }
    return isFunction(initialValue) ? initialValue() : initialValue;
  });

  const updateValue = useCallback(
    (newValue: React.SetStateAction<T>) => {
      setValue(newValue);

      const actualValue = isFunction(newValue) ? newValue() : newValue;
      localStorageWrapper.setItem(key, actualValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

type AnyFunction = (...args: unknown[]) => any;

function isFunction(value: unknown): value is AnyFunction {
  return typeof value === "function";
}
