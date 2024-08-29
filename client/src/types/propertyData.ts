import { PropertyDataKey } from "../enums";

export interface PropertyData {
  key: PropertyDataKey;
  value: [number, number];
  active: boolean;
  description: string;
  valueModifier: (_value: [number, number]) => [number, number];
}
