import { useState } from "react";
import TrackSelectInput from "../../components/TrackSelectInput";
import { Track } from "@spotify/web-api-ts-sdk";
import styled from "styled-components";

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
  const [selectedTracks, setSelectedTracks] = useState<Track[]>();

  return (
    <StyledPropertiesForm>
      <StepWrapper>
        <div>
          <h1>Step 1. Search & Select Tracks</h1>
          <code>Example: "never gonna give you up rick astley"</code>
        </div>
        <TrackSelectInput onChange={setSelectedTracks} />
      </StepWrapper>
      <button>Next</button>
    </StyledPropertiesForm>
  );
}
