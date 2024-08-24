import { useCallback, useState } from "react";
import TrackSelectInput from "../../components/TrackSelectInput";
import { Track } from "@spotify/web-api-ts-sdk";
import styled from "styled-components";
import PropertiesGrid from "../PropertiesGrid";
import { PropertyData } from "../../types";
import { PropertyDataKey } from "../../enums";
import { getRecommendations } from "../../utils";
import { Playlist } from "@phosphor-icons/react";
import RecommendationsResults from "../RecommendationsResults";

const StyledPropertiesForm = styled("div")`
  width: 100%;
  max-width: 648px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 24px;
  gap: 24px;
`;

const StepWrapper = styled("div")`
  height: calc(100vh - 96px - 64px);
  padding-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;
  overflow-y: scroll;
  align-content: start;
`;

const StepNavWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StepNavButton = styled("button")`
  padding: 4px;
  border-radius: 50px;
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.1);

  &.selected {
    background-color: #9f0fff;
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
`;

const defaultPropertyData: PropertyData[] = Object.values(PropertyDataKey).map(
  (key) => {
    return {
      key,
      value: [20, 80],
      active: false,
      // TODO
      description:
        "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
    };
  }
);

export default function PropertiesForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>();
  const [propertyData, setPropertyData] =
    useState<PropertyData[]>(defaultPropertyData);

  const goToStepOne = useCallback(() => {
    setStep(1);
  }, [selectedTracks, propertyData]);

  const goToStepTwo = useCallback(() => {
    if (!selectedTracks) return;
    setStep(2);
  }, [selectedTracks, propertyData]);

  const goToStepThree = useCallback(() => {
    getRecommendations(propertyData, selectedTracks ?? []);
    setStep(3);
  }, [selectedTracks, propertyData]);

  return (
    <StyledPropertiesForm>
      {step === 1 && (
        <StepWrapper>
          <h1>Step 1. Search & Select Tracks</h1>
          <TrackSelectInput onChange={setSelectedTracks} />
        </StepWrapper>
      )}

      {step === 2 && (
        <StepWrapper>
          <h1>Step 2. Define Search Parameters</h1>
          <PropertiesGrid
            propertyData={propertyData}
            setPropertyData={setPropertyData}
          />
        </StepWrapper>
      )}

      {step === 3 && (
        <StepWrapper>
          <h1>Step 3. Results</h1>

          {selectedTracks && (
            <RecommendationsResults
              propertyData={propertyData}
              tracks={selectedTracks}
            />
          )}
        </StepWrapper>
      )}

      <StepNavWrapper>
        <StepNavButton
          onClick={goToStepOne}
          className={step === 1 ? "selected" : ""}
        >
          <code>1</code>
        </StepNavButton>
        <StepNavButton
          disabled={!selectedTracks}
          onClick={goToStepTwo}
          className={step === 2 ? "selected" : ""}
        >
          <code>2</code>
        </StepNavButton>
        <StepNavButton
          disabled={!selectedTracks || step === 1}
          onClick={goToStepThree}
          className={step === 3 ? "selected" : ""}
        >
          <Playlist size={16} />
        </StepNavButton>
      </StepNavWrapper>
    </StyledPropertiesForm>
  );
}
