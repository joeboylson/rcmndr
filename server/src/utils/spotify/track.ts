import { ItemTypes, Page, Track } from "@spotify/web-api-ts-sdk";
import axios from "axios";
import { serialize } from "../authentication";

export async function searchTracks(accessToken: string, q: string) {
  try {
    const authString = `Bearer ${accessToken}`;
    const headers = { Authorization: authString };

    const itemType: ItemTypes = "track";
    const params = serialize({ q, type: [itemType] });

    const url = `https://api.spotify.com/v1/search?${params}`;

    const response = await axios.get(url, { headers });
    const tracks = response.data?.tracks as Page<Track>;

    if (response.status === 200) return tracks;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
