import { useEffect, useMemo, useState } from "react";
import { ParentBounds } from "../../types";
import { sortBy } from "lodash";
import {
  MinMaxRangeInput,
  MinMaxWrapper,
  StyledMinMaxInput,
} from "./StyledComponents";

interface _props {
  parentBounds: ParentBounds;
  onChange: (value: [number, number]) => void;
  value: [number, number];
}

export default function MinMaxInput({ parentBounds, onChange, value }: _props) {
  const inputProps = {
    $parentBounds: parentBounds,
    type: "range",
    min: 5,
    max: 95,
  };

  const [r1, setR1] = useState<number>(value[0]);
  const [r2, setR2] = useState<number>(value[1]);

  const handleSetR1 = (_r1: string) => setR1(Number(_r1));
  const handleSetR2 = (_r2: string) => setR2(Number(_r2));

  const values = useMemo(() => sortBy([r1, r2], (i) => i), [r1, r2]);

  useEffect(() => {
    onChange([values[0], values[1]]);
  }, [values]);

  const y = useMemo(() => {
    const [_min, _max] = values;
    const maxAsPercentage = _max / 100;
    const maxAsValue = parentBounds.height * maxAsPercentage;
    return Math.round(parentBounds.height - maxAsValue);
  }, [values]);

  const height = useMemo(() => {
    const [_min, _max] = values;
    const minMaxRange = Math.abs(_min - _max);
    const minMaxRangePercentage = minMaxRange / 100;
    return Math.round(parentBounds.height * minMaxRangePercentage);
  }, [values]);

  const rxy = useMemo(() => {
    if (height > 8) return 8;
    return height;
  }, [height]);

  return (
    <StyledMinMaxInput $parentBounds={parentBounds}>
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

      <svg
        width={parentBounds.width}
        height={parentBounds.height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width={parentBounds.width - 50}
          height={height}
          x={0}
          y={y}
          rx={rxy}
          ry={rxy}
          fill="rgba(213, 150, 255, 1)"
        />
        <text x={4} y={y + 16} style={{ fontFamily: "Elios", fill: "white" }}>
          Max
        </text>
        <line
          x1={6}
          x2={parentBounds.width - 45}
          y1={y + 1}
          y2={y + 1}
          stroke="white"
        />
        <text
          x={36}
          y={height + y - 4}
          style={{ fontFamily: "Elios", fill: "white" }}
        >
          Min
        </text>
        <line
          x1={36}
          x2={parentBounds.width - 45}
          y1={height + y}
          y2={height + y}
          stroke="white"
        />
        Sorry, your browser does not support inline SVG.
      </svg>

      <svg
        width={parentBounds.width}
        height={parentBounds.height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width={parentBounds.width - 50}
          height={parentBounds.height}
          x={0}
          y={0}
          rx={rxy}
          ry={rxy}
          fill="rgba(255, 255, 255, 0.1)"
        />
        Sorry, your browser does not support inline SVG.
      </svg>
    </StyledMinMaxInput>
  );
}
