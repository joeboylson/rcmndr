export type ParentBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export interface WithParentBounds {
  $parentBounds?: ParentBounds;
}

export type MinMaxDisplayProps = WithParentBounds & {
  $minMax: number[];
};
