import express, { Request, Response } from "express";
import { searchTracks } from "../../utils";

export const trackRouter = express.Router();

trackRouter.get(
  "/search",
  // TODO: ensure authenticated
  async (request: Request, response: Response) => {
    try {
      const { q } = request.query;
      if (!q) throw "Invalid query";

      const accessToken = request.session?.accessTokenData?.access_token;
      const data = await searchTracks(accessToken, q.toString());

      return response.status(200).send(data);
    } catch (error) {
      console.error(error);

      return response.status(404).send("Unauthorized");
    }
  }
);
