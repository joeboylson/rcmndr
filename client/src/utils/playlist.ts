import { CreatePlaylistRequest } from "@shared/types";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import axios from "axios";

export async function createPlaylistWithTracks(data: CreatePlaylistRequest) {
  try {
    return (await axios.post(`/api/playlist/create`, data)) as
      | SimplifiedPlaylist
      | undefined;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
  }
}
