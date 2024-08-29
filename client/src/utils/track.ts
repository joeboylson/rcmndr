import { propertyDescriptions } from "../constants";
import { PropertyDataKey } from "../enums";

export function getDefaultPropertyData() {
  const value: [number, number] = [20, 80];
  const active = false;

  return Object.values(PropertyDataKey).map((key) => {
    const description = propertyDescriptions[key] as string;

    const valueModifier = ([a, b]: [number, number]) => {
      if (key === PropertyDataKey.POPULARITY) return [a, b] as [number, number];
      return [a / 100, b / 100] as [number, number];
    };

    return { key, value, active, description, valueModifier };
  });
}
