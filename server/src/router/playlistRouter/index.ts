import express, { Request, Response } from "express";
import {
  getSpotifyProfile,
  createEmptyPlaylist,
  addTracksToPlaylist,
} from "../../utils";
import { CreatePlaylistRequest } from "@shared/types";

export const playlistRouter = express.Router();

playlistRouter.post(
  "/create",
  // TODO: ensure authenticated
  async (request: Request, response: Response) => {
    try {
      const createPlaylistRequest =
        request.body as unknown as CreatePlaylistRequest;
      if (!createPlaylistRequest) throw "Invalid query";

      const accessToken = request.session?.accessTokenData?.access_token;
      const { id: userId } = await getSpotifyProfile(accessToken);
      const { name: playlistName, trackIds } = createPlaylistRequest;

      const playlist = await createEmptyPlaylist(
        accessToken,
        userId,
        playlistName
      );
      if (!playlist) throw "Error creating playlist";

      const playlistSnapshot = addTracksToPlaylist(
        accessToken,
        playlist.id,
        trackIds
      );
      if (!playlistSnapshot) throw "Error adding tracks to playlist";

      return response.status(200).send(playlist);
    } catch (error) {
      console.error(error);

      return response.status(404).send("Unauthorized");
    }
  }
);
