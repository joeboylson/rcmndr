import axios from "axios";
import fs from "fs";
import path from "path";
import querystring from "querystring";
import { Request, Response, NextFunction } from "express";
import { isEmpty, random } from "lodash";
import { isProduction } from ".";
import { AccessToken } from "@spotify/web-api-ts-sdk";

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
  const _alreadyAuthenticated = !isEmpty(request.session.accessTokenData);
  if (_alreadyAuthenticated) return response.redirect("/");
  return next();
}

export function tryReadSessionFile(filename: string) {
  try {
    const dataString = fs.readFileSync(filename, { encoding: "utf8" });
    return JSON.parse(dataString);
  } catch (_) {
    return null;
  }
}

export function tryDeleteSessionFile(filename: string) {
  try {
    fs.unlinkSync(filename);
  } catch (_) {}
}

export function devSessionMiddleware(
  request: Request,
  _: unknown,
  next: NextFunction
) {
  if (isProduction()) return next();

  // const _store = request.sessionStore;
  // const _filename = path.join(__dirname, "../__session.json");
  // const sessionHasAuth = !!request.session.accessTokenData;
  // const existingSession = tryReadSessionFile(_filename);

  // // attempt read session from files
  // if (existingSession && !sessionHasAuth)
  //   _store.createSession(request, existingSession);

  // // attempt to write session if authentication exists
  // if (sessionHasAuth) {
  //   const data = JSON.stringify(request.session);
  //   fs.writeFileSync(_filename, data);
  // }

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
      show_dialogue: true,
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
