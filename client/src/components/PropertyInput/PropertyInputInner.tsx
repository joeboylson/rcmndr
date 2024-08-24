import { compact } from "lodash";
import { ParentBounds } from "../../types";
import MinMaxInput from "../MinMaxInput";
import {
  InnerResetButton,
  InnerSaveButton,
  InnerTitleText,
  InnerTitleValue,
  InputInnerBottom,
  InputInnerTop,
  MinMaxInputWrapper,
  PropertyDescription,
  StyledPropertyInputInner,
} from "./styledComponents";
import { useToggle } from "../../hooks/useToggle";
import { useEffect, MouseEvent } from "react";
import { PropertyData } from "../PropertiesGrid";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

interface _props {
  isOpen: boolean;
  parentBounds: ParentBounds;
  propertyData: PropertyData;
  handleClose: () => void;
  handleClearValue: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange: (value: [number, number]) => void;
}

export default function PropertyInputInner({
  isOpen,
  parentBounds,
  propertyData,
  handleClose,
  onChange,
  handleClearValue,
}: _props) {
  const inputControls = useToggle();

  useEffect(() => {
    if (isOpen) setTimeout(inputControls.enable, 300);
  }, [isOpen]);

  const elementClasses = compact([inputControls.value ? "is-open" : ""]).join(
    " "
  );

  const handleCloseInput = () => {
    inputControls.disable();
    setTimeout(handleClose, 300);
  };

  return (
    <StyledPropertyInputInner $parentBounds={parentBounds}>
      <MinMaxInputWrapper $parentBounds={parentBounds}>
        <MinMaxInput
          parentBounds={parentBounds}
          onChange={onChange}
          value={propertyData.value}
        />
      </MinMaxInputWrapper>

      <InputInnerTop className={elementClasses}>
        <InnerTitleText>{propertyData.key}:</InnerTitleText>
        <InnerTitleValue>Max: {propertyData.value[1]}</InnerTitleValue>
        <InnerTitleValue>Min: {propertyData.value[0]}</InnerTitleValue>
      </InputInnerTop>

      <InputInnerBottom className={elementClasses}>
        <PropertyDescription>{propertyData.description}</PropertyDescription>

        <InnerResetButton onClick={handleClearValue}>
          <ArrowCounterClockwise />
        </InnerResetButton>

        <InnerSaveButton onClick={handleCloseInput}>Close</InnerSaveButton>
      </InputInnerBottom>
    </StyledPropertyInputInner>
  );
}