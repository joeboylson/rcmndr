import { SimplifiedPlaylist, Track } from "@spotify/web-api-ts-sdk";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { createPlaylistWithTracks } from "../../utils";
import { CreatePlaylistRequest } from "@shared/types";
import { isEmpty } from "lodash";

const StyledSaveTracksToPlayListForm = styled("div")`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 12px;
`;

const PlaylistNameInput = styled("input")`
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

const PlaylistSaveButton = styled("button")`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 8px;

  &:disabled {
    opacity: 0.1;
    cursor: not-allowed;
  }
`;

interface _props {
  tracks: Track[];
  handleReset: () => void;
}

export default function SaveTracksToPlayListForm({
  tracks,
  handleReset,
}: _props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlist, setPlaylist] = useState<SimplifiedPlaylist>();

  const trackIds = useMemo(() => tracks.map((i) => i.id), [tracks]);

  const handleCreatePlaylist = useCallback(async () => {
    setLoading(true);

    try {
      const newPlayListData: CreatePlaylistRequest = {
        name: `[RCMNDR] ${playlistName}`,
        trackIds,
      };

      const _playlist = await createPlaylistWithTracks(newPlayListData);
      if (_playlist) setPlaylist(_playlist);
    } finally {
      setLoading(false);
    }
  }, [playlistName, trackIds]);

  const buttonDisabled = useMemo(
    () => isEmpty(playlistName) || loading,
    [playlistName, loading]
  );

  if (loading) return <p>Loading...</p>;

  if (!isEmpty(playlist)) {
    return (
      <StyledSaveTracksToPlayListForm>
        <p>Playlist Created!</p>
        <PlaylistSaveButton onClick={handleReset}>Reset</PlaylistSaveButton>
      </StyledSaveTracksToPlayListForm>
    );
  }

  return (
    <StyledSaveTracksToPlayListForm>
      <PlaylistNameInput
        type="text"
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder={`Create a playlist with these ${tracks.length} tracks`}
      />
      <PlaylistSaveButton
        onClick={() => handleCreatePlaylist()}
        disabled={buttonDisabled}
      >
        Create Playlist
      </PlaylistSaveButton>
    </StyledSaveTracksToPlayListForm>
  );
}
