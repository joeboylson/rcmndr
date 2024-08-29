import { ReactNode, useEffect, useMemo } from "react";
import { useStateDebounced } from "../../hooks/useStateDebounced";
import { useTracksSearch } from "../../hooks/useTrackSearch";
import { isEmpty } from "lodash";
import { Track } from "@spotify/web-api-ts-sdk";
import styled from "styled-components";
import TracksList from "../TracksList";
import {
  Check,
  Empty,
  HourglassHigh,
  HourglassLow,
  Plus,
} from "@phosphor-icons/react";

const StyledTracksSearch = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

const InputWrapper = styled("div")`
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
`;

const TrackQInput = styled("input")`
  width: 100%;
  border: 0;
  border: 1px solid #9f0fff;
  color: #d596ff;
  outline: none;
  background-color: transparent;
  padding: 8px 16px;
  border-radius: 8px;

  &:disabled {
    color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NoResults = styled("div")`
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  gap: 12px;

  background-color: rgba(255, 255, 255, 0.1);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid yellow;
`;

interface _props {
  onTrackSelect: (track: Track) => void;
  filterTracks?: Array<Track>;
  disabled?: boolean;
}

export default function TracksSearch({
  onTrackSelect,
  disabled,
  filterTracks,
}: _props) {
  const { tracks, searchTracks, loading } = useTracksSearch();
  const [trackQ, setTrackQ, debouncing] = useStateDebounced<string>("", 500);

  useEffect(() => {
    if (isEmpty(trackQ) || !trackQ) return;
    searchTracks(trackQ);
  }, [searchTracks, trackQ]);

  const showResults = useMemo(
    () => !loading && !disabled && !!trackQ,
    [loading, disabled, trackQ]
  );

  const filteredTracks = useMemo(() => {
    if (!filterTracks) return tracks;
    const filterTrackIds = filterTracks.map((i) => i.id);
    return tracks?.filter((i) => !filterTrackIds.includes(i.id));
  }, [filterTracks, tracks]);

  return (
    <StyledTracksSearch>
      <InputWrapper>
        {debouncing && !loading && <HourglassHigh />}
        {loading && <HourglassLow />}
        {!debouncing && !loading && <Check />}

        <TrackQInput
          type="text"
          onChange={(e) => setTrackQ(e.target.value)}
          disabled={disabled}
          placeholder={`"man in black johnny cash"`}
        />
        {/**
         * TODO: add a cool animation that types in popular song names into the search bar
         */}
      </InputWrapper>

      {!showResults ||
        (isEmpty(tracks) && (
          <NoResults>
            <Empty />

            {filterTracks?.length === 3 ? (
              <code>Maximum number of tracks selected</code>
            ) : (
              <code>No tracks matched your search</code>
            )}
          </NoResults>
        ))}

      {showResults && (
        <TracksList
          tracks={filteredTracks}
          onTrackSelect={onTrackSelect}
          icon={<Plus />}
        />
      )}
    </StyledTracksSearch>
  );
}
