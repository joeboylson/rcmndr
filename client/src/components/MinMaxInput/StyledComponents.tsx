import styled from "styled-components";
import { WithParentBounds } from "../../types";

export const StyledMinMaxInput = styled("div")<WithParentBounds>`
  height: ${({ $parentBounds }) => $parentBounds?.height}px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  position: relative;
`;

export const MinMaxWrapper = styled("div")`
  position: relative;
`;

export const shared = `
  -webkit-appearance: none;
  appearance: none;
`;

export const sharedThumb = `
  ${shared}
  background-color: rgba(255, 255, 255, 0.3);
  width: 25px;
  height: 25px;
  pointer-events: all;
  cursor: pointer;
  border-radius: 8px;
`;

export const MinMaxRangeInput = styled("input")<WithParentBounds>`
  background-color: purple;
  top: 0;
  right: 12px;
  position: absolute;import styled from "styled-components";
  height: ${({ $parentBounds }) => $parentBounds?.height}px;

  writing-mode: vertical-lr;
  direction: rtl;
  vertical-align: middle;

  -moz-appearance: none;
  background-color: transparent;
  pointer-events: none;
  ${shared}

  /* chromium */
  &[type="range"]::-webkit-slider-thumb {
    ${sharedThumb}
  }

  /* Firefox */
  &[type="range"]::-moz-range-thumb {
    ${sharedThumb}
  }
`;

export const SVGRangeDisplay = styled("svg")`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;
