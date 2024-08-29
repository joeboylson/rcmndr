import { CreatePlaylistData } from "@shared/types";
import {
  Playlist,
  SimplifiedPlaylist,
  SnapshotReference,
} from "@spotify/web-api-ts-sdk";
import axios from "axios";

export async function createEmptyPlaylist(
  accessToken: string,
  userId: string,
  playlistName: string
) {
  try {
    const authString = `Bearer ${accessToken}`;
    const headers = { Authorization: authString };

    const body: CreatePlaylistData = { name: playlistName };

    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

    const response = await axios.post(url, body, { headers });

    console.log(response.data);
    console.log(response.status);

    const playlist = response.data as SimplifiedPlaylist;
    if ([200, 201].includes(response.status)) return playlist;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addTracksToPlaylist(
  accessToken: string,
  playlistId: string,
  trackIds: string[]
) {
  try {
    const authString = `Bearer ${accessToken}`;
    const headers = { Authorization: authString };

    /**
     * change list of trackIds to uri's
     */
    const uris = trackIds.map((i) => `spotify:track:${i}`);
    const body = { uris };
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const response = await axios.post(url, body, { headers });
    const playlist = response.data as SnapshotReference;

    if (response.status === 200) return playlist;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
