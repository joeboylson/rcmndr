import styled from "styled-components";
import { PropertyData } from "../../types";

interface _props {
  propertyData: PropertyData;
}

/**
 * purple darker: #c266ff
 * purple lighter: #ebccff
 */

const StyledProperyDataDisplay = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
`;

const ValueKey = styled("strong")`
  text-transform: capitalize;
`;

const MinMaxWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 8px;
`;

const sharedValueMinMax = `
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  &:before {
    display: block;
    content: "";
    width: 25px;
    height: 25px;
    background-color: red;
    margin-right: 4px;
  }
`;

const ValueMin = styled("div")`
  ${sharedValueMinMax}

  &:before {
    background-color: #ebccff;
  }
`;

const ValueMax = styled("div")`
  ${sharedValueMinMax}

  &:before {
    background-color: #c266ff;
  }
`;

export default function PropertyDataDisplay({ propertyData }: _props) {
  const [min, max] = propertyData.value;

  return (
    <StyledProperyDataDisplay>
      <ValueKey>{propertyData.key}</ValueKey>
      <MinMaxWrapper>
        <ValueMin>{min}</ValueMin>
        <ValueMax>{max}</ValueMax>
      </MinMaxWrapper>
    </StyledProperyDataDisplay>
  );
}
