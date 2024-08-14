import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

const StyledMinMaxInput = styled("div")`
  width: 100%;
  min-width: 300px;
  display: grid;
  align-items: center;
  gap: 24px;
  grid-template-columns: 1fr 128px;
`;

const MinMaxWrapper = styled("div")`
  position: relative;
  height: 16px;
`;

const MinMaxRangeInput = styled("input")`
  position: absolute;
  -webkit-appearance: none;
  width: 100%;
  height: 0;
  appearance: none;

  /* For Chrome, Safari, Opera, and Edge  */
  &::-webkit-slider-runnable-track {
    background: transparent;
    height: 0;
  }

  /* For Firefox */
  &::-moz-range-track {
    background: transparent;
    height: 0;
  }

  &::after {
    pointer-events: none;
    top: 7px;
    left: 0;
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: black;
  }
`;

const inputProps = { type: "range" };

export default function MinMaxInput() {
  const [r1, setR1] = useState<number>(20);
  const [r2, setR2] = useState<number>(80);

  const handleSetR1 = useCallback((_r1: string) => setR1(Number(_r1)), [setR1]);
  const handleSetR2 = useCallback((_r2: string) => setR2(Number(_r2)), [setR2]);

  const values = useMemo(() => [r1, r2].sort(), [r1, r2]);

  return (
    <StyledMinMaxInput>
      <MinMaxWrapper>
        <MinMaxRangeInput
          {...inputProps}
          onChange={(e) => handleSetR1(e.target.value)}
          defaultValue={r1}
        />
        <MinMaxRangeInput
          {...inputProps}
          onChange={(e) => handleSetR2(e.target.value)}
          defaultValue={r2}
        />
      </MinMaxWrapper>
      <p>{JSON.stringify(values)}</p>
    </StyledMinMaxInput>
  );
}
