import express, { Request, Response } from "express";
import { isEmpty } from "lodash";
import { IsAuthenticated } from "@shared/types";
import {
  generateSpotifyAuthUrl,
  getSpotifyAccessToken,
  calculateExpiration,
  getSpotifyProfile,
} from "../../utils";

export const authenticationRouter = express.Router();

authenticationRouter.get(
  "/is-authenticated",
  async (request: Request, response: Response) => {
    try {
      // shorthand
      const s = request.session;

      const isAuthenticated = s.isAuthenticated;
      const rightNowInMs = Date.now();
      const isExpired = rightNowInMs > (s.expirationDateInMs ?? 0);

      if (!isAuthenticated || isExpired) {
        const isNotAuthenticated: IsAuthenticated = {
          authenticated: false,
          user: null,
        };

        return response.status(200).send(isNotAuthenticated);
      }

      return response.status(200).send(isAuthenticated);
    } catch (error) {
      const _response: IsAuthenticated = { authenticated: false, user: null };
      return response.status(200).send(_response);
    }
  }
);

authenticationRouter.get(
  "/get-spotify-auth-url",
  function (_request, response) {
    response.send(generateSpotifyAuthUrl());
  }
);

authenticationRouter.get("/callback", async (request, response) => {
  const { code } = request.query;

  if (isEmpty(code)) throw new Error("invalid credentials");

  try {
    const accessTokenData = await getSpotifyAccessToken(code.toString());
    /**
     * calculate expiration
     */
    const tokenSeconds = accessTokenData.expires_in;
    const expirationDateInMs = calculateExpiration(tokenSeconds);

    /**
     * get profile
     */
    const user = await getSpotifyProfile(accessTokenData.access_token);

    const isAuthenticated: IsAuthenticated = {
      authenticated: true,
      user,
    };

    if (!isEmpty(accessTokenData)) {
      request.session.accessTokenData = accessTokenData;
      request.session.expirationDateInMs = expirationDateInMs;
      request.session.isAuthenticated = isAuthenticated;
      request.session.save();
      return response.redirect("/");
    }

    return response.redirect("/auth/logout");
  } catch (error) {
    return response.redirect("/");
  }
});

authenticationRouter.get("/logout", function (request, response) {
  request.session.accessTokenData = null;
  return response.redirect("/");
});
