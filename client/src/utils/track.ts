import { propertyDescriptions } from "../constants";
import { PropertyDataKey } from "../enums";

export function getDefaultPropertyData() {
  const value: [number, number] = [20, 80];
  const active = false;

  return Object.values(PropertyDataKey).map((key) => {
    const description = propertyDescriptions[key];
    return { key, value, active, description };
  });
}
