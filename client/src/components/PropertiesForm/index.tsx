import { useState } from "react";
import TrackSelectInput from "../../components/TrackSelectInput";
import { Track } from "@spotify/web-api-ts-sdk";
import styled from "styled-components";
import PropertiesGrid from "../PropertiesGrid";

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
  padding: 0 24px 24px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;
  overflow-y: scroll;
  align-content: start;
`;

export default function PropertiesForm() {
  const [step, setStep] = useState<1 | 2>(2);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>();

  const goToStepTwo = () => setStep(2);

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
          <PropertiesGrid />
        </StepWrapper>
      )}

      <button onClick={goToStepTwo}>Next</button>
    </StyledPropertiesForm>
  );
}
