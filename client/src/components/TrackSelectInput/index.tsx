import { useCallback, useMemo, useState } from "react";
import TracksSearch from "../../components/TrackSearch";
import { Track } from "@spotify/web-api-ts-sdk";

export default function TrackSelectInput() {
  const [selectedTracks, setSelectedTracks] = useState<Array<Track>>([]);

  const handleAddtrack = useCallback((track: Track) => {
    setSelectedTracks((_tracks) => [..._tracks, track]);
  }, []);

  const handleRemoveTrack = (track: Track) => {
    setSelectedTracks((_tracks) => _tracks.filter((t) => t.id !== track.id));
  };

  const searchIsDisabled = useMemo(
    () => selectedTracks.length >= 3,
    [selectedTracks]
  );

  return (
    <>
      <TracksSearch
        onTrackSelect={handleAddtrack}
        disabled={searchIsDisabled}
        filterTracks={selectedTracks}
      />
      <hr />
      {selectedTracks?.map((track) => {
        const _onClick = () => handleRemoveTrack(track);

        return (
          <button onClick={_onClick}>
            {track.name} <br />
            {track.album.name} <br />
            {track.artists.map((artist) => artist.name).join(", ")}
          </button>
        );
      })}
    </>
  );
}
