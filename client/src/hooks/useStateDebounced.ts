import { debounce, DebouncedFunc } from "lodash";
import { useCallback, useEffect, useState } from "react";

export function useStateDebounced<T>(
  defaultValue?: T,
  debounceAmount?: number
) {
  const [value, _setValue] = useState<T | undefined>(defaultValue);
  const [debouncing, setDebouncing] = useState(false);
  const debouncedSetValue = debounce(_setValue, debounceAmount ?? 500);

  useEffect(() => {
    console.info(value);
    setDebouncing(false);
  }, [value]);

  const setValue = useCallback((_value: T) => {
    setDebouncing(true);
    debouncedSetValue(_value);
  }, []);

  type _hookReturnType = [
    string | undefined,
    DebouncedFunc<(_value: T) => void>,
    boolean
  ];

  return [value, setValue, debouncing] as _hookReturnType;
}
