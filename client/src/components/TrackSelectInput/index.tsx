import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Track } from "@spotify/web-api-ts-sdk";
import TracksSearch from "../../components/TrackSearch";
import styled from "styled-components";
import TracksList from "../TracksList";
import { Minus } from "@phosphor-icons/react";

const StyledTrackSelectInput = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-content: start;
`;

const SelectedTracksWrapper = styled("div")`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 24px;
  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;

  @media (max-width: 600px) {
    padding: 12px;
  }

  @media (max-width: 500px) {
    padding: 8px;
  }
`;

interface _props {
  selectedTracks: Track[] | undefined;
  setSelectedTracks: Dispatch<SetStateAction<Track[] | undefined>>;
}

export default function TrackSelectInput({
  selectedTracks,
  setSelectedTracks,
}: _props) {
  const handleAddtrack = useCallback((track: Track) => {
    setSelectedTracks((_tracks) => [...(_tracks ?? []), track]);
  }, []);

  const handleRemoveTrack = (track: Track) => {
    setSelectedTracks((_tracks) =>
      (_tracks ?? []).filter((t) => t.id !== track.id)
    );
  };

  const searchIsDisabled = useMemo(
    () => (selectedTracks ?? []).length >= 3,
    [selectedTracks]
  );

  return (
    <StyledTrackSelectInput>
      <div>
        <code>Tracks: {selectedTracks?.length ?? 0}/3</code>
        <TracksSearch
          onTrackSelect={handleAddtrack}
          disabled={searchIsDisabled}
          filterTracks={selectedTracks}
        />
      </div>

      <SelectedTracksWrapper>
        <h2>Selected tracks:</h2>
        <TracksList
          tracks={selectedTracks}
          onTrackSelect={handleRemoveTrack}
          icon={<Minus />}
        />
      </SelectedTracksWrapper>
    </StyledTrackSelectInput>
  );
}
