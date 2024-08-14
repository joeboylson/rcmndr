import styled from "styled-components";

export const StyledPropertyInputWrapper = styled("div")`
  position: relative;

  &::after {
    content: "";

    position: fixed;

    top: 0px;
    left: 0px;
    transform: translate(-25px, -25px);
    background-color: rgba(0, 0, 0, 0);

    width: 200vw;
    height: 200vh;
    pointer-events: none;
    transition: all 200ms;
    backdrop-filter: blur(0px);
  }

  &.is-open::after {
    pointer-events: initial;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const PropertyInputContentOverlay = styled("div")`
  position: absolute;
  z-index: +1;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1;
  transition: all 300ms;
  width: 100px;
  height: 100px;
  border-radius: 8px;

  &:hover {
    background-color: rgba(0, 0, 0 0.5);
  }

  &.is-open {
    opacity: 0;
    pointer-events: 0;
  }
`;

interface PropertyInputContentProps {
  $domrect?: DOMRect;
}

const _transate = ({ $domrect }: PropertyInputContentProps) =>
  `-${$domrect?.left}px, -${$domrect?.top}px`;

export const PropertyInputContent = styled("div")<PropertyInputContentProps>`
  z-index: +1;
  position: absolute;

  top: 0;
  left: 0;
  width: ${({ $domrect }) => `${$domrect?.width}`}px;
  height: ${({ $domrect }) => `${$domrect?.height}`}px;

  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;

  transition: all 500ms;
  transform: translate(0px, 0px);
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);

  &.is-open {
    z-index: +3;
    top: 5vh;
    left: 5vw;
    transform: translate(${_transate});
    width: 90vw;
    height: 90vh;
    backdrop-filter: blur(3px);
  }

  * {
    color: white;
    padding: 24px;
  }
`;
