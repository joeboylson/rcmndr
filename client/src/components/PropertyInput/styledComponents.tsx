import styled from "styled-components";
import { WithParentBounds } from "../../types";

export const StyledPropertyInput = styled("div")`
  position: relative;
  border-radius: 8px;

  &.is-hidden {
    opacity: 0;
  }

  &.is-absolute {
    pointer-events: none;
  }
`;

export const PropertyInputContent = styled("div")<WithParentBounds>`
  width: ${({ $parentBounds }) => $parentBounds?.width}px;
  height: ${({ $parentBounds }) => $parentBounds?.height}px;
  background-color: transparent;
  border-radius: 8px;

  transition: all 400ms;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);

  overflow: hidden;
  display: grid;
  place-items: center;

  &.is-absolute {
    position: absolute;
    top: ${({ $parentBounds }) => $parentBounds?.top}px;
    left: ${({ $parentBounds }) => $parentBounds?.left}px;
  }

  &.is-fullsize {
    width: 90vw;
    height: 90vh;
    top: 5vh;
    left: 5vw;
    background-color: rgba(0, 0, 0, 0.1);
  }

  * {
    color: white;
  }
`;

export const PropertyInputContentBackground = styled("div")<WithParentBounds>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  transition: all 400ms;

  &.is-fullsize {
    opacity: 1;
  }
`;

export const InputOpenButton = styled("div")<WithParentBounds>`
  width: ${({ $parentBounds }) => $parentBounds?.width}px;
  height: ${({ $parentBounds }) => $parentBounds?.height}px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  overflow: hidden;
  z-index: 1;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);

  transition: all 1000ms;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);

  &.is-active {
    border: 1px solid rgba(213, 150, 255, 1);
  }

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.75);
  }

  &.is-absolute {
    background-color: transparent;
    border: 1px solid transparent;
    backdrop-filter: none;
  }

  &.is-disabled {
    backdrop-filter: blur(8px) grayscale(100%);
    border: 1px solid transparent;
    cursor: not-allowed;
  }
`;

export const InputOpenButtonDisplay = styled("div")<WithParentBounds>`
  position: relative;
  width: ${({ $parentBounds }) => $parentBounds?.width}px;
  height: ${({ $parentBounds }) => $parentBounds?.height}px;
  transition: all 100ms;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  padding: 12px;

  display: grid;
  place-items: center;

  &.is-absolute {
    transform: translateY(-12px);
    opacity: 0;
  }

  button {
    border: 0;
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

/**
 * ------------------------------------------------------------------
 * PROPERTY INPUT INNER
 * ------------------------------------------------------------------
 */

export const StyledPropertyInputInner = styled("div")<WithParentBounds>`
  display: grid;
  place-items: center;
  width: 100%;
  height: ${({ $parentBounds }) => $parentBounds?.height}px;
  overflow: hidden;
`;

export const MinMaxInputWrapper = styled("div")<WithParentBounds>`
  width: ${({ $parentBounds }) => $parentBounds?.width}px;
  height: ${({ $parentBounds }) => $parentBounds?.height}px;
  position: relative;
`;

const sharedInputInner = `
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;

  transition: all 400ms;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);

  &.is-open {
    opacity: 1;
  }
`;

export const InputInnerTop = styled("div")`
  ${sharedInputInner}
  top: 0;
  width: 100%;
  max-width: 500px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

export const InputInnerBottom = styled("div")`
  ${sharedInputInner}
  bottom: 0;
  width: 100%;
  max-width: 500px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 24px;
`;

export const InnerResetButton = styled("button")`
  border: 0;
`;

export const InnerSaveButton = styled("button")`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 44px;
`;

export const PropertyDescription = styled("p")`
  display: block;
  grid-column: span 2;
  text-align: center;
`;
