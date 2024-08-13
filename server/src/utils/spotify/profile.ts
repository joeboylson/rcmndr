import { User } from "@spotify/web-api-ts-sdk";
import axios from "axios";

export async function getSpotifyProfile(accessToken: string) {
  try {
    const url = "https://api.spotify.com/v1/me";
    const authString = `Bearer ${accessToken}`;
    const headers = { Authorization: authString };

    const profileResponse = await axios.get(url, { headers });

    if (profileResponse.status === 200) return profileResponse.data as User;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
