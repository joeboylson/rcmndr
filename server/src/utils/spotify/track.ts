import {
  ItemTypes,
  Page,
  RecommendationsRequest,
  RecommendationsResponse,
  Track,
} from "@spotify/web-api-ts-sdk";
import axios from "axios";
import { serialize } from "../authentication";

export async function searchTracks(accessToken: string, q: string) {
  try {
    const authString = `Bearer ${accessToken}`;
    const headers = { Authorization: authString };

    const itemType: ItemTypes = "track";
    const params = serialize({ q, type: [itemType], limit: 6 });

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

export async function getRecommendations(
  accessToken: string,
  recommendationsRequest: RecommendationsRequest
) {
  try {
    const authString = `Bearer ${accessToken}`;
    const headers = { Authorization: authString };

    const params = serialize(recommendationsRequest);
    const url = `https://api.spotify.com/v1/recommendations?${params}`;

    const response = await axios.get(url, { headers });
    const responseData = response.data as RecommendationsResponse;

    if (response.status === 200) return responseData;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
