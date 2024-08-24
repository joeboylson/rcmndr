import styled from "styled-components";
import PropertyInput from "../PropertyInput";
import { useMemo, useState } from "react";

export interface PropertyData {
  key: string;
  value: [number, number];
  active: boolean;
  description: string;
}

// TODO
const tempProperties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];
const defaultPropertyData: PropertyData[] = tempProperties.map((key) => {
  return {
    key,
    value: [20, 80],
    active: false,
    description:
      "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
  };
});

const gapSize = 12;
const gridItemSize = (597 - gapSize * 2) / 3;

const StyledPropertiesGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, ${gridItemSize}px);
  grid-template-rows: repeat(3, ${gridItemSize}px);
  gap: ${gapSize}px;
`;

export default function PropertiesGrid() {
  const [openProperty, setOpenProperty] = useState<string>();
  const [data, setData] = useState<PropertyData[]>(defaultPropertyData);

  const onChange = (key: string, propertyData: PropertyData) => {
    setData((_data) => {
      return _data.map((i) => {
        if (i.key === key) return propertyData;
        return i;
      });
    });
  };

  const activeProperties = useMemo(() => data.filter((i) => i.active), [data]);

  const maxPropertiesAchieved = useMemo(
    () => activeProperties.length >= 3,
    [activeProperties]
  );

  return (
    <>
      <code>Properties Selected: {activeProperties.length ?? 0}/3</code>
      <StyledPropertiesGrid>
        {data.map((i) => {
          const _onChange = (_pd: PropertyData) => onChange(i.key, _pd);
          const _disabled = !i.active && maxPropertiesAchieved;
          const _hidden = !!openProperty && openProperty !== i.key;
          const _setPropertyIsOpen = (isOpen: boolean) =>
            setOpenProperty(isOpen ? i.key : undefined);

          return (
            <PropertyInput
              key={`property-${i.key}`}
              onChange={_onChange}
              propertyData={i}
              disabled={_disabled}
              hidden={_hidden}
              setPropertyIsOpen={_setPropertyIsOpen}
            />
          );
        })}

        <code>{JSON.stringify(data)}</code>
      </StyledPropertiesGrid>
    </>
  );
}
