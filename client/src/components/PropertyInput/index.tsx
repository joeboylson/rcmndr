import { useEffect, useRef, useState, MouseEvent } from "react";
import {
  InputOpenButton,
  InputOpenButtonDisplay,
  PropertyInputContent,
  PropertyInputContentBackground,
  StyledPropertyInput,
} from "./styledComponents";
import { compact } from "lodash";
import { ParentBounds, PropertyData } from "../../types";
import { Portal } from "@mui/material";
import { useToggle } from "../../hooks/useToggle";
import PropertyInputInner from "./PropertyInputInner";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

interface _props {
  onChange: (value: PropertyData) => void;
  propertyData: PropertyData;
  disabled: boolean;
  hidden: boolean;
  setPropertyIsOpen: (value: boolean) => void;
}

export default function PropertyInput({
  onChange,
  propertyData,
  disabled,
  hidden,
  setPropertyIsOpen,
}: _props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const portalControls = useToggle();
  const sizeControls = useToggle();
  const [parentBounds, _setParentBounds] = useState<ParentBounds>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleValueChange = (value: [number, number]) => {
    const _propertyData = { ...propertyData, value };
    onChange(_propertyData);
  };

  const handleMakeActive = () => {
    const _propertyData = { ...propertyData, active: true };
    onChange(_propertyData);
  };

  const setParentBounds = () => {
    if (wrapperRef.current) {
      const _domRect = wrapperRef.current.getBoundingClientRect();
      _setParentBounds(_domRect);
    }
  };

  const handleOpen = () => {
    if (disabled) return;

    handleMakeActive();
    setParentBounds();
    setPropertyIsOpen(true);

    portalControls.enable();
    setTimeout(sizeControls.enable, 100);
  };

  const handleClose = () => {
    sizeControls.disable();
    setTimeout(() => {
      setPropertyIsOpen(false);
      portalControls.disable();
    }, 200);
  };

  const handleClearValue = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true);

    setTimeout(() => {
      onChange({ ...propertyData, active: false, value: [20, 80] });
      setLoading(false);
    }, 1);
  };

  const elementClasses = compact([
    portalControls.value ? "is-absolute" : null,
    sizeControls.value ? "is-fullsize" : null,
    disabled ? "is-disabled" : null,
    hidden ? "is-hidden" : null,
    propertyData.active ? "is-active" : null,
  ]).join(" ");

  useEffect(setParentBounds, []);

  if (loading) return <div></div>;

  return (
    <StyledPropertyInput
      ref={wrapperRef}
      className={elementClasses}
      data-id="StyledPropertyInput"
    >
      {parentBounds && (
        <>
          <InputOpenButton
            onClick={handleOpen}
            $parentBounds={parentBounds}
            className={elementClasses}
          >
            <InputOpenButtonDisplay
              className={elementClasses}
              $parentBounds={parentBounds}
            >
              <p>{propertyData.key}</p>

              <p>
                Value: {propertyData.value[0]}, {propertyData.value[1]}
              </p>

              <button onClick={handleClearValue}>
                <ArrowCounterClockwise />
              </button>
            </InputOpenButtonDisplay>
          </InputOpenButton>

          <Portal disablePortal={!portalControls.value}>
            <PropertyInputContentBackground className={elementClasses} />
            <PropertyInputContent
              className={elementClasses}
              $parentBounds={parentBounds}
            >
              <PropertyInputInner
                isOpen={portalControls.value}
                parentBounds={parentBounds}
                propertyData={propertyData}
                onChange={handleValueChange}
                handleClose={handleClose}
                handleClearValue={handleClearValue}
              />
            </PropertyInputContent>
          </Portal>
        </>
      )}
    </StyledPropertyInput>
  );
}
