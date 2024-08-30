import express, { Request, Response } from "express";
import {
  alreadyAuthorizedMiddleware,
  getRecommendations,
  searchTracks,
} from "../../utils";
import {
  RecommendationsRequest,
  RecommendationsResponse,
} from "@spotify/web-api-ts-sdk";

export const trackRouter = express.Router();

trackRouter.get(
  "/search",
  alreadyAuthorizedMiddleware,
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

trackRouter.get(
  "/recommendations",
  alreadyAuthorizedMiddleware,
  async (request: Request, response: Response) => {
    try {
      const recommendationsRequest = request.query as RecommendationsRequest;
      if (!recommendationsRequest) throw "Invalid query";

      const accessToken = request.session?.accessTokenData?.access_token;

      const data: RecommendationsResponse = await getRecommendations(
        accessToken,
        recommendationsRequest
      );

      return response.status(200).send(data);
    } catch (error) {
      console.error(error);

      return response.status(404).send("Unauthorized");
    }
  }
);
