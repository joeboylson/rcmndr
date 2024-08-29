import { useCallback, useState } from "react";
import TrackSelectInput from "../../components/TrackSelectInput";
import { Track } from "@spotify/web-api-ts-sdk";
import styled from "styled-components";
import PropertiesGrid from "../PropertiesGrid";
import { PropertyData } from "../../types";
import { getRecommendations } from "../../utils";
import { Playlist } from "@phosphor-icons/react";
import RecommendationsResults from "../RecommendationsResults";
import { getDefaultPropertyData } from "../../utils";

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
  width: 100%;
  height: calc(100vh - 96px - 64px);
  padding-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;
  overflow-y: scroll;
  align-content: start;
`;

const StepNavWrapper = styled("div")`
  width: 100%;
  border-top: 1px solid white;
  padding-top: 12px;
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

// generate default property data
const _propertyData = getDefaultPropertyData();

export default function PropertiesForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>();
  const [propertyData, setPropertyData] =
    useState<PropertyData[]>(_propertyData);

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

  const handleReset = () => {
    setStep(1);
    setSelectedTracks(undefined);
    setPropertyData(_propertyData);
  };

  return (
    <StyledPropertiesForm>
      <>
        {step === 1 && (
          <StepWrapper>
            <h1>Step 1. Song Search</h1>
            <p>
              Search for a song you love by typing its name into the search bar.
              Select your song from the list of results, and the algorithm will
              use this song to find other tracks that are similar. Easily
              discover new music that matches your taste!
            </p>

            <TrackSelectInput
              selectedTracks={selectedTracks}
              setSelectedTracks={setSelectedTracks}
            />
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper>
            <h1>Step 2. Fine-Tune Search</h1>
            <p>
              You can fine-tune up to 3 search properties. Clicking into a
              property will activate it; to deactivate, use the reset button in
              the top corner of each property. Once you're satisfied, proceed to
              the next step to view the refined search results.
            </p>
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
                handleReset={handleReset}
              />
            )}
          </StepWrapper>
        )}
      </>

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
