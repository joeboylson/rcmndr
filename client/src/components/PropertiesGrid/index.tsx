import styled from "styled-components";
import PropertyInput from "../PropertyInput";
import { useMemo, useState, Dispatch, SetStateAction } from "react";
import { PropertyData } from "../../types";
import { PropertyDataKey } from "../../enums";

const gapSize = 12;
const gridItemSize = (597 - gapSize * 2) / 3;

const StyledPropertiesGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, ${gridItemSize}px);
  grid-template-rows: repeat(3, ${gridItemSize}px);
  gap: ${gapSize}px;
`;

interface _props {
  propertyData: PropertyData[];
  setPropertyData: Dispatch<SetStateAction<PropertyData[]>>;
}

export default function PropertiesGrid({
  propertyData,
  setPropertyData,
}: _props) {
  const [openProperty, setOpenProperty] = useState<string>();

  const onChange = (key: string, propertyData: PropertyData) => {
    setPropertyData((_data) => {
      return _data.map((i) => {
        if (i.key === key) return propertyData;
        return i;
      });
    });
  };

  const activeProperties = useMemo(
    () => propertyData.filter((i) => i.active),
    [propertyData]
  );

  const maxPropertiesAchieved = useMemo(
    () => activeProperties.length >= 3,
    [activeProperties]
  );

  return (
    <>
      <code>Properties Selected: {activeProperties.length ?? 0}/3</code>
      <StyledPropertiesGrid>
        {propertyData.map((i) => {
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
      </StyledPropertiesGrid>
    </>
  );
}
