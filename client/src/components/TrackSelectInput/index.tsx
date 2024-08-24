import { useCallback, useEffect, useMemo, useState } from "react";
import { Track } from "@spotify/web-api-ts-sdk";
import TracksSearch from "../../components/TrackSearch";
import styled from "styled-components";
import TracksList from "../TracksList";

const StyledTrackSelectInput = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  align-content: start;
`;

const SelectedTracksWrapper = styled("div")`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 24px;
  border-radius: 8px;
`;

interface _props {
  onChange: (tracks: Track[]) => void;
}

export default function TrackSelectInput({ onChange }: _props) {
  const [selectedTracks, setSelectedTracks] = useState<Track[]>();

  useEffect(() => {
    if (!selectedTracks) return;
    onChange(selectedTracks);
  }, [selectedTracks, onChange]);

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
        <TracksList tracks={selectedTracks} onTrackSelect={handleRemoveTrack} />
      </SelectedTracksWrapper>
    </StyledTrackSelectInput>
  );
}
