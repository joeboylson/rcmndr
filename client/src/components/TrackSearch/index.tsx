import { useEffect, useMemo } from "react";
import { useStateDebounced } from "../../hooks/useStateDebounced";
import { useTracksSearch } from "../../hooks/useTrackSearch";
import { isEmpty } from "lodash";
import { Track } from "@spotify/web-api-ts-sdk";

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
  const [trackQ, setTrackQ] = useStateDebounced<string>("", 1000);

  useEffect(() => {
    if (isEmpty(trackQ) || !trackQ) return;
    searchTracks(trackQ);
  }, [searchTracks, trackQ]);

  const showResults = useMemo(() => !loading && !disabled, [loading, disabled]);

  const filteredTracks = useMemo(() => {
    if (!filterTracks) return tracks;
    const filterTrackIds = filterTracks.map((i) => i.id);
    return tracks?.filter((i) => !filterTrackIds.includes(i.id));
  }, [filterTracks, tracks]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setTrackQ(e.target.value)}
        disabled={disabled}
      />
      {loading && <p>Loading...</p>}
      {showResults && (
        <>
          {filteredTracks?.map((track) => {
            const _onClick = disabled ? () => {} : () => onTrackSelect(track);

            return (
              <button onClick={_onClick}>
                {track.name} <br />
                {track.album.name} <br />
                {track.artists.map((artist) => artist.name).join(", ")}
              </button>
            );
          })}
        </>
      )}
    </>
  );
}
