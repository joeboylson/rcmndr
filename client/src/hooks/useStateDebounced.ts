import { debounce, DebouncedFunc } from "lodash";
import { useState } from "react";

export function useStateDebounced<T>(
  defaultValue?: T,
  debounceAmount?: number
) {
  const [value, _setValue] = useState<T | undefined>(defaultValue);
  const setValue = debounce(_setValue, debounceAmount ?? 500);

  type _hookReturnType = [
    string | undefined,
    DebouncedFunc<(_value: T) => void>
  ];

  return [value, setValue] as _hookReturnType;
}
