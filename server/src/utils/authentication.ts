import axios from "axios";
import querystring from "querystring";
import { Request, Response, NextFunction } from "express";
import { random } from "lodash";
import { AccessToken } from "@spotify/web-api-ts-sdk";
import { IsAuthenticated } from "@shared/types";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URL = process.env.SPOTIFY_REDIRECT_URL;

export function authorizationMiddleware(
  _: Request,
  response: Response,
  next: NextFunction
) {
  /**
   * TODO: ensure user is authenticated
   */
  const _isAuthenticated = true;

  if (_isAuthenticated) return next();
  return response.status(404).send();
}

export function alreadyAuthorizedMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const _alreadyAuthenticated =
    request.session?.isAuthenticated?.authenticated ?? false;
  if (!_alreadyAuthenticated) {
    const isNotAuthenticated: IsAuthenticated = {
      authenticated: false,
      user: null,
    };

    return response.status(200).send(isNotAuthenticated);
  }

  return next();
}

export function generateSpotifyAuthUrl() {
  const state = random(1000, 1000 * 1000);
  const scope =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private";

  return (
    "https://accounts.spotify.com/authorize?" +
    serialize({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      state: state,
    })
  );
}

export async function getSpotifyAccessToken(code: string) {
  const method = "POST";

  const url = "https://accounts.spotify.com/api/token";

  const data = querystring.stringify({
    code,
    grant_type: "authorization_code",
    redirect_uri: SPOTIFY_REDIRECT_URL,
  });

  const authParams = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
  const authString = `Basic ${Buffer.from(authParams).toString("base64")}`;
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: authString,
  };

  const tokenResponse = await axios({ method, url, data, headers });
  if (tokenResponse.status === 200) return tokenResponse.data as AccessToken;
}

export function serialize(obj: Record<string, any>) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export function calculateExpiration(tokenExpiresIn: number) {
  const rightNowInMs = Date.now();

  /**
   * Multiple by 0.95 to provide a bit of time overlap
   */
  const tokenExpiresIn_InMs = tokenExpiresIn * 0.95 * 1000;
  return rightNowInMs + tokenExpiresIn_InMs;
}
