export interface CreatePlaylistRequest {
  name: string;
  trackIds: string[];
}

/**
 * Copied this from https://github.com/spotify/spotify-web-api-ts-sdk/blob/2635bbd9f060c27d5580648576a70e150efdc865/src/endpoints/PlaylistsEndpoints.ts#L111
 */
export interface CreatePlaylistData {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}
