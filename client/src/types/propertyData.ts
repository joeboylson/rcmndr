import { PropertyDataKey } from "../enums";

export interface PropertyData {
  key: PropertyDataKey;
  value: [number, number];
  active: boolean;
  description: string;
}
